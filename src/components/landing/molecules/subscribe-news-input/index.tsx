'use client';
import { GuestService } from '@api/guest.service';
import { EMAIL_REGEX_V3 } from '@constants/regex';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface CompanySignUpModalProps {}

// Define Yup validation schema
const schema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .required('Vui lòng nhập ')
    .email('Email không hợp lệ')
    .matches(EMAIL_REGEX_V3, 'Email không hợp lệ')
    .trim('Không được chứa khoảng trắng ở đầu và cuối'),
});

export default function SubscribeNewsInput() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema), // Integrate Yup schema
  });

  const onSubmit = async (data: any) => {
    try {
      await GuestService.receiveMessage({
        guest_email: data?.email,
      });
      message.success('Đăng ký nhận tin thành công');
      reset();
    } catch (e: any) {
      message.error('Đã xảy ra lỗi khi đăng ký nhận tin');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-[68px] w-full flex-row items-center justify-between rounded-[16px] bg-[#FFFFFF1A] p-[16px] [backdrop-filter:blur(24px)] xl:w-[492px]">
        <input
          {...register('email')}
          type="text"
          id="input"
          className="text-normal h-full w-full border-none bg-transparent text-[16px] leading-[30px] text-white outline-none placeholder:text-[#AFAEAD]"
          required
          placeholder="Email nhận thông tin từ iVita"
        />
        <button
          type="submit"
          className="border-none bg-transparent outline-none"
        >
          <Image
            className="hover:cursor-pointer"
            width={48}
            height={48}
            alt="blur-send-icon"
            src="/icon/blur-send-icon.svg"
          />
        </button>
      </div>

      {/* Display error message if email validation fails */}
      {errors.email && (
        <div className="mt-2 flex flex-row items-center gap-x-1">
          <Image
            alt="img-error"
            width={16}
            height={16}
            src="/icon/error-icon.svg"
          />
          <span className="text-[15px] font-semibold leading-[18px] text-[#e87070]">
            {errors.email.message}
          </span>
        </div>
      )}
    </form>
  );
}
