'use client';
import { authService } from '@api/auth.service';
import { companyService } from '@api/company.service';
import AcceptTermsCheckboxControl from '@components/hook-form/AcceptTermsCheckbox';
import { PhoneFieldControl } from '@components/hook-form/PhoneField';
import { TextFieldControl } from '@components/hook-form/TextField';
import { EMAIL_REGEX_V3, EMOJI_REGEX } from '@constants/regex';
import { yupResolver } from '@hookform/resolvers/yup';
import { HookFormProvider, useHookForm } from '@hooks/useHookForm';
import { FormTemplateProps } from '@interfaces/interfaces';
import recoilStore from '@recoil-store';
import cn, { trimObjectValues } from '@utils';
import { isPhoneValid } from '@utils/phone';
import { Modal, notification } from 'antd';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as Yup from 'yup';

interface CompanySignUpModalProps {}

const schema = Yup.object().shape({
  companyName: Yup.string()
    .label('Tên công ty')
    .required('Vui lòng nhập')
    .test(
      'no-emoji',
      'Tên công ty không hợp lệ',
      (value: string) => !EMOJI_REGEX.test(value),
    )
    .trim('Không được chứa khoảng trắng ở đầu và cuối'),
  tax: Yup.string()
    .label('Mã số thuế')
    .required('Vui lòng nhập')
    .matches(/^\d{10}(-\d{3})?$/, 'Mã số thuế không hợp lệ')
    .trim('Không được chứa khoảng trắng ở đầu và cuối'),
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
  acceptTerms: Yup.bool()
    .required('Vui lòng nhập')
    .oneOf([true], 'Accept Terms is required'),
});

const CompanySignUpModal: React.FC<CompanySignUpModalProps> = ({}) => {
  const [openCompanySignUpModal, setOpenCompanySignUpModal] = useRecoilState(
    recoilStore.openCompanySignUpModal,
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
      companyName: '',
      tax: '',
      phone: '',
      // name: '',
      email: '',
      acceptTerms: true,
    },
  });
  const { handleSubmit } = methods;

  const isDisabled = Boolean(
    !methods.watch('companyName') ||
      !methods.watch('tax') ||
      !methods.watch('email') ||
      !methods.watch('acceptTerms'),
  );

  const onFinish = async (values: any) => {
    setLoading(true);
    setEmailAddress(values.email);
    const { tax, email, acceptTerms, companyName } = methods.getValues();

    // const number = phoneUtil.parseAndKeepRawInput(phone, 'VN');
    // const formatPhone = phoneUtil.format(number, PNF.E164);

    try {
      const res = await companyService.register(
        trimObjectValues({
          company_name: companyName,
          tax_code: tax,
          // representative_name: name,
          representative_email: email,
          // representative_phone_number: phone,
          is_terms_agreed: acceptTerms,
        }),
      );
      if (res.state) {
        setTokenState(res.state);
      }
      setOpenCompanySignUpModal(false);
      notification.success({ message: 'Đăng ký tài khoản thành công' });
    } catch (error: any) {
      console.log('🚀 ~ onFinish ~ error:', error);

      const ERROR_MSG: any = {
        4001: 'Mã số thuế đã được đăng ký',
      };

      notification.warning({
        message:
          ERROR_MSG?.[error?.response?.data?.error] ||
          error?.response?.data?.message ||
          ERROR_MSG['4001'] ||
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
        open={openCompanySignUpModal}
        onCancel={() => {
          setOpenCompanySignUpModal(false);
        }}
        afterClose={() => {
          methods.reset();
        }}
        destroyOnClose
        height={450}
        wrapClassName="custom-modal"
        footer={null}
      >
        <div className="mb-5 flex flex-col gap-y-3">
          <p className="m-0 mx-auto text-center text-[20px] font-semibold leading-normal text-black">
            Đăng ký tài khoản doanh nghiệp
          </p>
          <p className="m-0 text-center text-[15px] font-medium leading-[17px] text-black">
            Việc của bạn là tìm cách phát triển doanh nghiệp, còn sức khoẻ nhân
            viên cứ để iVita hỗ trợ bạn quản lý ngay từ hôm nay.
          </p>
        </div>
        {/* Register form ------------------------------- */}
        <HookFormProvider {...methods}>
          <form onSubmit={handleSubmit(onFinish)}>
            <div className="flex flex-col gap-y-4">
              <TextFieldControl
                label="Mã số thuế"
                placeholder="Nhập MST"
                name="tax"
                required
                className="auth-input"
                noSpacing
                isFloatInput
              />
              <TextFieldControl
                label="Tên doanh nghiệp"
                placeholder="Nhập tên doanh nghiệp"
                name="companyName"
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
              <div className="">
                <AcceptTermsCheckboxControl
                  label="Tôi đã đọc và đồng ý với Điều khoản sử dụng"
                  name="acceptTerms"
                  noSpacing
                />
              </div>
              {/*  */}
              <div className="flex flex-row items-center gap-x-[12px]">
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
          </form>
        </HookFormProvider>
      </Modal>
    </div>
  );
};

export default CompanySignUpModal;
