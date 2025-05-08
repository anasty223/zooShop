// store/profileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  id: number;
  value: string;
}

interface ProfileState {
  formData: {
    name: string;
    address: Address[];
    orderSource: string;
    password: string;
    phone: string;
    email: string;
  };
  errors: {
    address: string[];
  };
  activeTab: string;
}

const initialState: ProfileState = {
  formData: {
    name: "Николай",
    address: [{ id: 1, value: "" }],
    orderSource: "",
    password: "",
    phone: "+3 (912) 345 67 89",
    email: "myname@mail.ru",
  },
  errors: {
    address: [],
  },
  activeTab: "profile",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<ProfileState["formData"]>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    addAddress: (state) => {
      const newAddress = { id: Date.now(), value: "" };
      state.formData.address.push(newAddress);
      state.errors.address.push("");
    },
    removeAddress: (state, action: PayloadAction<number>) => {
      const indexToRemove = state.formData.address.findIndex(
        (addr) => addr.id === action.payload
      );
    
      if (indexToRemove !== -1) {
        state.formData.address.splice(indexToRemove, 1);
        state.errors.address.splice(indexToRemove, 1);
      }
    },
    
    updateAddress: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      state.formData.address[index].value = value;
      state.errors.address[index] = value.trim() ? "" : "Укажите адрес доставки";
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setFormData, addAddress, removeAddress, updateAddress, setActiveTab } =
  profileSlice.actions;
export default profileSlice.reducer;