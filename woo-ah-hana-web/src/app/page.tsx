import LoginForm from "./ui/components/auth/login-form";
import Image from "next/image";
import Logo from '@/app/assets/img/logo.png';
import NotificationIndex from "./ui/components/notification";

export default async function Home() {

  return (
    <div className='px-10 mb-10 flex flex-col'>
      <NotificationIndex/>
      <div className="justify-items-center">
        <Image src={Logo} alt={"우아하나로고"} width={300} height={300} priority/>
      </div>
      <div className="mb-10">
        <LoginForm/>
      </div>
    </div>
  );
}