"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const AppLogoutBtnM = () => {
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
      <div className="border-t-solid flex h-[40px] w-full items-center border-t border-t-border-line pl-16 pr-4 pt-16">
        <button className="flex cursor-pointer gap-8" onClick={handleLogout}>
          <svg width="24" height="24" className="fill-text-error">
            <g>
              <path d="M15.3333 8.66667L14.3933 9.60667L16.1133 11.3333H9.33325V12.6667H16.1133L14.3933 14.3867L15.3333 15.3333L18.6666 12L15.3333 8.66667ZM6.66659 7.33333H11.9999V6H6.66659C5.93325 6 5.33325 6.6 5.33325 7.33333V16.6667C5.33325 17.4 5.93325 18 6.66659 18H11.9999V16.6667H6.66659V7.33333Z"></path>
            </g>
          </svg>
          <span className="text-title-md-medium text-text-error">
            ออกจากระบบ
          </span>
        </button>
      </div>
    </>
  );
};

export default AppLogoutBtnM;
