import { useState } from "react";

export default function PreviewImage({ file }) {
  const [preview, setPreview] = useState({});
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <div>
      <img
        src={preview}
        alt=""
        width="300px"
        style={{
          maxWidth: "80px",
          minWidth: "80px",
          minHeight: "80px",
          maxHeight: "80px",
        }}
      />
    </div>
  );
}
