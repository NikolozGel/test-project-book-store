export default function BookAddedAlert({
  message,
  setAlert,
}: {
  message: string;
  setAlert: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      message: string;
    }>
  >;
}) {
  return (
    <div
      className={`fixed bg-green-500 text-white z-50 text-center py-5 px-8 rounded-lg right-10 bottom-5 transform 
        ${message ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex gap-10 items-center justify-center">
        <h1>{message}</h1>
        <button
          className="flex items-center justify-center bg-transparent text-white hover:text-green-300 focus:outline-none"
          onClick={() => {
            setAlert({ visible: false, message: "" });
            setTimeout(() => setAlert({ visible: false, message: "" }), 1000);
          }}
        >
          <span className="bg-white text-red-600  w-6 h-6  rounded-full flex items-center justify-center">
            x
          </span>
        </button>
      </div>
    </div>
  );
}
