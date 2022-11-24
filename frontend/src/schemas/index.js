import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signInSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, {
            message: "Please enter a valid password",
        })
        .required("Required"),
});

export const advancedSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, "Username must be at least 3 characters long")
        .required("Required"),
    jobType: yup
        .string()
        .oneOf(
            ["designer", "developer", "manager", "other"],
            "Please select a job type"
        )
        .required("Required"),
    acceptedTos: yup
        .boolean()
        .oneOf([true], "Please accept the terms of service"),
});

export const signUpSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    confirmemail: yup
        .string()
        .oneOf([yup.ref("email"), null], "Email must match")
        .required("Required"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, {
            message: "Please create a stronger password",
        })
        .required("Required"),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    citizen: yup
        .number()
        .required("Required")
        .test(
            "validNationalID",
            (id) => "Licence ID Number must be valid",
            (value) => {
                let id = String(value);
                if (id.length != 13) {
                    return false;
                }
                let sum = 0;
                // STEP 1 - get only first 12 digits
                for (let i = 0; i < 12; i++) {
                    // STEP 2 - multiply each digit with each index (reverse)
                    // STEP 3 - sum multiply value together
                    sum += parseInt(id.charAt(i)) * (13 - i);
                }
                // STEP 4 - mod sum with 11
                let mod = sum % 11;
                // STEP 5 - subtract 11 with mod, then mod 10 to get unit
                let check = (11 - mod) % 10;
                // STEP 6 - if check is match the digit 13th is correct
                if (check == parseInt(id.charAt(12))) {
                    console.log("Valid ID");
                    return true;
                }
                return false;
            }
        ),
    acceptedTos: yup
        .boolean()
        .oneOf([true], "Please accept the terms of service"),
});
