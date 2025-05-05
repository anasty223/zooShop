import React from "react";
import DeleteSVG  from "@/assets/svg/delete.svg";

type Props = {
  formData: { address: { id: number; value: string }[] };
  errors: { address: string[] };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleRemove: () => void;
  index: number;
};

const AddressSection = ({ formData, errors, handleChange, handleRemove, index }: Props) => {
  return (
    <div className="mb-[20px] flex items-center gap-[10px] max-w-[400px]">
      <div className="flex-1">
        <label className="text-[#848992] text-[14px] mb-[5px] block">
          Адрес {index + 1}{" "}
          {errors.address[index] && (
            <span className="text-red-500 text-[12px]">{errors.address[index]}</span>
          )}
        </label>
        <div className="flex items-center ">              <input
          type="text"
          name={`address-${index}`}
          value={formData.address[index].value}
          onChange={(e) => handleChange(e, index)}
          className={`w-full h-[40px] px-[10px] border rounded-[4px] text-[14px] ${
            errors.address[index] ? "border-red-500" : "border-[#C8CBD0]"
          }`}
        />
      </div>
      <div className="flex items-center gap-[10px] mt-[10px]"  onClick={handleRemove}><DeleteSVG/> <span>Удалить</span></div></div>
  
    </div>
  );
};

export default AddressSection;