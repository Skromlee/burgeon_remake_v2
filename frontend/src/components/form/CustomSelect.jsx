import { useField } from "formik";

const CustomSelect = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <>
            <label>{label}</label>
            <select
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
export default CustomSelect;
