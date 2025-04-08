"use client";
import LoginForm from "./LoginForm";

type LoginFormProps = {
  setShowLogin: (value: boolean) => void;
};

export default function AppDialogLogin({ setShowLogin }: LoginFormProps) {
  const closeLoginForm = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = () => {
    closeLoginForm();
  };

  return (
    <div className="fixed inset-0 z-30 flex h-screen w-screen items-center justify-center visible">
      <section className="mx-auto size-full rounded-[10px] bg-background-white p-24 shadow-xs md:p-40 hide-scrollbar relative z-30 h-fit overflow-hidden overflow-y-scroll  md:!max-w-[406px] py-40 max-w-screen max-h-[90vh] sm:max-w-[428px]">
        <button
          className="absolute right-16 top-16 flex size-[40px] items-center justify-center"
          onClick={closeLoginForm}
        >
          <svg width="24" height="24">
            <g id="close">
              <path d="M19 6.91L17.59 5.5L12 11.09L6.41 5.5L5 6.91L10.59 12.5L5 18.09L6.41 19.5L12 13.91L17.59 19.5L19 18.09L13.41 12.5L19 6.91Z"></path>
            </g>
          </svg>
        </button>
        <div className="space-y-16">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      </section>
    </div>
  );
}
