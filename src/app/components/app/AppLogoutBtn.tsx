"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const AppLogoutBtn = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/login");
        },
      },
    });
  };
  return (
    <>
      <div
        role="menuitem"
        className="relative flex h-[40px] cursor-default select-none items-center px-8 py-4 text-label-medium text-text-primary outline-none transition-colors focus:bg-state-layer-primary-hovered focus:text-text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 !min-h-[40px] !w-full !p-0"
      >
        <button
          className="flex w-full items-center space-x-8"
          onClick={handleLogout}
        >
          <svg
            width="24"
            height="24"
            className="fill-text-error"
            data-sentry-element="svg"
          >
            <g id="log-out">
              <path d="M15.3333 8.66667L14.3933 9.60667L16.1133 11.3333H9.33325V12.6667H16.1133L14.3933 14.3867L15.3333 15.3333L18.6666 12L15.3333 8.66667ZM6.66659 7.33333H11.9999V6H6.66659C5.93325 6 5.33325 6.6 5.33325 7.33333V16.6667C5.33325 17.4 5.93325 18 6.66659 18H11.9999V16.6667H6.66659V7.33333Z"></path>
            </g>
          </svg>
          <span className="text-text-error">ออกจากระบบ</span>
        </button>
      </div>
    </>
  );
};

export default AppLogoutBtn;
