import { forwardRef, useImperativeHandle, useState } from "react";

const Alert = forwardRef((props, ref) => {
  const [message, setMessage] = useState(null);
  useImperativeHandle(ref, () => ({
    show: (alertMessage) => {
      setMessage(alertMessage);
    },
  }));

  function handleCloseAlert() {
    setMessage(null);
  }

  return (
    <div
      className={`bg-red-600 p-2 rounded flex items-center justify-between ${!message && "hidden"}`}
    >
      <p className="text-white">{message}</p>
      <button type="button" onClick={handleCloseAlert} className="text-white">
        X
      </button>
    </div>
  );
});

export default Alert;
