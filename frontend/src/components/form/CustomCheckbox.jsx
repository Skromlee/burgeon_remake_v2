import { useField } from "formik";

const CustomCheckbox = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <>
            <div className="">
                <input
                    {...field}
                    {...props}
                    className={
                        meta.touched && meta.error ? "border-red-400" : null
                    }
                />
                <span>I accept the terms of service</span>
            </div>
            {meta.touched && meta.error ? (
                <div className="text-red-600">{meta.error}</div>
            ) : null}
        </>
    );
};
export default CustomCheckbox;
