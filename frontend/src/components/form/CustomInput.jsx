import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <>
            <label>{label}</label>
            <input
                {...field}
                {...props}
                className={meta.touched && meta.error ? "border-red-400" : null}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-600">{meta.error}</div>
            ) : null}
        </>
    );
};
export default CustomInput;
