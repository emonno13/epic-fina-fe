'use client';
import { authService } from '@api/auth.service';
import { partnerService } from '@api/partner.service';
import AcceptTermsCheckboxControl from '@components/hook-form/AcceptTermsCheckbox';
import { PhoneFieldControl } from '@components/hook-form/PhoneField';
import { SelectFieldControl } from '@components/hook-form/SelectField';
import { TextFieldControl } from '@components/hook-form/TextField';
import { UploadCropFieldControl } from '@components/hook-form/UploadField';
import { EMAIL_REGEX_V3 } from '@constants/regex';
import { yupResolver } from '@hookform/resolvers/yup';
import { HookFormProvider, useHookForm } from '@hooks/useHookForm';
import { FormTemplateProps } from '@interfaces/interfaces';
import recoilStore from '@recoil-store';
import cn, { trimValue } from '@utils';
import { isPhoneValid } from '@utils/phone';
import { Modal, notification } from 'antd';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as Yup from 'yup';

interface PartnerSignUpModalProps {}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const schema = Yup.object().shape({
  registrationMethod: Yup.string()
    .label('Hình thức đăng ký')
    .required('Vui lòng chọn hình thức đăng ký')
    .trim('Không được chứa khoảng trắng ở đầu và cuối'),
  developmentType: Yup.string()
    .label('Tên công ty')
    .required('Vui lòng chọn loại hình mà bạn cung cấp')
    .trim('Không được chứa khoảng trắng ở đầu và cuối'),
  name: Yup.string().label('Email').required('Vui lòng nhập'),
  email: Yup.string()
    .label('Email')
    .required('Vui lòng nhập')
    .email('Email không hợp lệ')
    .matches(EMAIL_REGEX_V3, 'Email không hợp lệ')
    .trim('Không được chứa khoảng trắng ở đầu và cuối'),
  phone: Yup.string()
    .label('Số điện thoại')
    .required('Vui lòng nhập')
    .test('check-phone', 'Số điện thoại không hợp lệ', function (value) {
      const isValid = isPhoneValid(value);
      return isValid;
    })
    .trim('Không được chứa khoảng trắng ở đầu và cuối'),
  productInfo: Yup.array()
    .min(1, 'Vui lòng tải lên ít nhất một tệp.')
    .test('fileSize', 'Tệp quá lớn. Kích thước tối đa là 5MB.', (value) => {
      if (!value || value.length === 0) return true; // if there's no file, skip the size check
      return value.every((file: any) => file.size <= MAX_FILE_SIZE);
    })
    .test(
      'fileFormat',
      'Định dạng tệp không hợp lệ. Chỉ hỗ trợ JPG, PNG.',
      (value) => {
        if (!value || value.length === 0) return true; // if there's no file, skip the format check
        return value.every((file: any) =>
          SUPPORTED_FORMATS.includes(file.type),
        );
      },
    ),
  acceptTerms: Yup.bool()
    .required('Vui lòng nhập')
    .oneOf([true], 'Accept Terms is required'),
});

const PartnerSignUpModal: React.FC<PartnerSignUpModalProps> = ({}) => {
  const [openPartnerSignUpModal, setOpenPartnerSignUpModal] = useRecoilState(
    recoilStore.openPartnerSignUpModal,
  );

  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [tokenState, setTokenState] = useState('');

  const formTemplateRef = useRef<FormTemplateProps>(null);
  const methods = useHookForm({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    defaultValues: {
      registrationMethod: '',
      developmentType: '',
      phone: '',
      name: '',
      email: '',
      productInfo: [],
      acceptTerms: true,
    },
  });
  const { handleSubmit } = methods;

  const isDisabled = Boolean(
    !methods.watch('registrationMethod') ||
      !methods.watch('developmentType') ||
      !methods.watch('email') ||
      !methods.watch('productInfo') ||
      !methods.watch('acceptTerms'),
  );

  const onFinish = async (values: any) => {
    console.log('🚀 ~ onFinish ~ values:', values);
    setLoading(true);
    setEmailAddress(values.email);
    const {
      registrationMethod,
      developmentType,
      name,
      phone,
      email,
      productInfo,
      acceptTerms,
    } = methods.getValues();

    try {
      const formData: any = new FormData();
      formData.append('type_register', registrationMethod);
      formData.append('type_develop', developmentType);
      formData.append('representative_name', trimValue(name));
      formData.append('representative_email', email);

      formData.append('representative_phone_number', phone);
      if (productInfo && productInfo.length > 0) {
        productInfo.forEach((item: any) => {
          if (item.originFileObj) {
            formData.append('resource', item.originFileObj); // Append files one by one
          }
        });
      }
      formData.append('is_terms_agreed', Boolean(acceptTerms));
      const res = await partnerService.register(formData);

      notification.success({ message: 'Đăng ký tài khoản thành công' });
      setOpenPartnerSignUpModal(false);
    } catch (error: any) {
      console.log('🚀 ~ onFinish ~ error:', error);
      notification.warning({
        message:
          error?.response?.data?.message ||
          'Địa chỉ email không hợp lệ hoặc đã được đăng ký',
      });
    } finally {
      setLoading(false);
    }
  };

  const onResendVerifyEmail = () => {
    setLoading(true);
    authService
      .resendVerifyByToken({
        state: tokenState,
      })
      .then(() => {
        setIsExpired(false);
        notification.success({
          message: 'Vui lòng kiểm tra hộp thư điện tử để xác nhận tài khoản!',
        });
      })
      .catch(() => {
        notification.warning({
          message: 'Lỗi không xác định vui lòng thử lại sau.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Modal
        title=""
        open={openPartnerSignUpModal}
        onCancel={() => {
          setOpenPartnerSignUpModal(false);
        }}
        afterClose={() => {
          methods.reset();
        }}
        destroyOnClose
        height={450}
        width={840}
        wrapClassName="custom-modal"
        footer={null}
      >
        <div className="mb-5 flex flex-col gap-y-3">
          <p className="m-0 mx-auto text-center text-[20px] font-semibold leading-normal text-black">
            Đăng ký tài khoản đối tác
          </p>
          <p className="m-0 text-center text-[15px] font-medium leading-[17px] text-black">
            Đồng hàng cùng iVita mang đến cuộc sống trẻ, khoẻ hơn mỗi ngày cho
            khách hàng và doanh nghiệp.
          </p>
        </div>
        {/* Register form ------------------------------- */}
        <HookFormProvider {...methods}>
          <form onSubmit={handleSubmit(onFinish)}>
            <div className="flex flex-col gap-[20px] xl:grid xl:grid-cols-2">
              <SelectFieldControl
                label="Hình thức đăng ký"
                placeholder="Bạn là cá nhân / nhà cung cấp"
                name="registrationMethod"
                required
                className="auth-input"
                options={[
                  { value: 'Cá nhân', label: 'Cá nhân' },
                  { value: 'Doanh nghiệp', label: 'Doanh nghiệp' },
                ]}
                noSpacing
                isFloatComponent
              />
              <SelectFieldControl
                label="Loại hình phát triển"
                placeholder="Vui lòng chọn loại hình mà bạn cung cấp"
                name="developmentType"
                required
                className="auth-input"
                options={[
                  {
                    value: 'Nhà cung cấp thực phẩm bổ sung',
                    label: 'Nhà cung cấp thực phẩm bổ sung',
                  },
                  {
                    value: 'Chuyên gia sức khoẻ',
                    label: 'Chuyên gia sức khoẻ',
                  },
                  {
                    value: 'Dịch vụ thăm khám tại nhà',
                    label: 'Dịch vụ thăm khám tại nhà',
                  },
                  {
                    value: 'Dịch vụ tư vấn tâm lý',
                    label: 'Dịch vụ tư vấn tâm lý',
                  },
                ]}
                noSpacing
                isFloatComponent
              />
              <TextFieldControl
                label="Tên đăng ký"
                placeholder="Nhập tên doanh nnghiệp"
                name="name"
                required
                className="auth-input"
                noSpacing
                isFloatInput
              />
              <TextFieldControl
                label="Email"
                placeholder="Nhập email"
                name="email"
                required
                className="auth-input"
                noSpacing
                isFloatInput
              />
              <PhoneFieldControl
                placeholder="Nhập số điện thoại"
                name="phone"
                required
                hideDropdown
              />
              <div className="flex flex-col">
                <p className="m-0 mb-[6px] text-[15px] font-bold leading-[17px] text-[#000000]">
                  Hình ảnh giấy tờ sản phẩm*
                </p>
                <p className="m-0 mb-[10px] text-[13px] leading-[15px] text-[#636363]">
                  Phiếu công bố sản phẩm, giấy phép quảng cáo. Max 1 MB
                </p>
                <UploadCropFieldControl
                  name="productInfo"
                  accept="image/png, image/jpeg, image/jpg" // accept="*"
                  multiple
                />
              </div>
              <div className="col-span-2 mx-auto flex w-fit flex-col">
                <div className="mb-[14px]">
                  <AcceptTermsCheckboxControl
                    label="Tôi đã đọc và đồng ý với Điều khoản sử dụng"
                    name="acceptTerms"
                    noSpacing
                  />
                </div>
                {/*  */}
                <div className="mb-[26px] flex flex-row items-center gap-x-[12px]">
                  <button
                    type="submit"
                    disabled={isDisabled || loading}
                    className={cn(
                      'px-auto w-full rounded-[63px] border-none  bg-[#1FB46E] py-[15px] text-[15px] font-medium leading-[17px] text-white outline-none hover:opacity-[0.8] ',
                      {
                        'bg-[#F2F3F9]': isDisabled,
                        'text-[#A2ACC0]': isDisabled,
                        '[box-shadow:_0px_-3.44px_6.881px_0px_rgba(244, 245, 250, 0.60)_inset]':
                          isDisabled,
                        'shadow-[0px_12px_12px_-12px_#14819999]': !isDisabled,
                      },
                    )}
                  >
                    Đăng ký
                  </button>
                </div>
                <p className="m-0 mx-auto text-[15px] font-normal leading-[18px]">
                  Bạn đã có tài khoản?{' '}
                  <span
                    className="text-[#1FB46E] underline hover:cursor-pointer"
                    onClick={() =>
                      window?.open('https://partner.ivita.vn', '_blank')
                    }
                  >
                    Đăng nhập ngay
                  </span>
                </p>
              </div>
            </div>
          </form>
        </HookFormProvider>
      </Modal>
    </div>
  );
};

export default PartnerSignUpModal;
