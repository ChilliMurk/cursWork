// import {FC, useState} from 'react';
// import {
//     ForgotPassword, FormFooter, FormFooterLink,
//     FormGroup, FormInput, FormLabel, FormOptions, FormSubmit,
//     Modal,
//     ModalClose,
//     ModalHeader,
//     ModalOverlay,
//     ModalSubtitle,
//     ModalTitle, RememberMe
// } from "@/common/components/mainPage/modals/style.ts";
// import {loginSuccess} from "@/store/reducers/authSlice.ts";
// import {useAppDispatch} from "@/common/hooks/useAppSelector.ts";
// import {useLoginMutation} from "@/store/reducers/auth/auth.ts";
// // import {useNavigate} from "react-router-dom";
// //import {useLoginMutation} from "@/store/api/authApi.ts"; // Импортируем хук
//
// interface LoginModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onSwitchToRegister: () => void;
//     onSuccess: () => void;
// }
//
// export const LoginModal: FC<LoginModalProps> = ({isOpen, onClose, onSwitchToRegister, onSuccess}) => {
//     const dispatch = useAppDispatch();
//     const [loginInput, setLoginInput] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     //const navigate = useNavigate();
//
//     // Используем хук для мутации логина
//     const [login, { isLoading }] = useLoginMutation();
//
//     // // Функция для определения, является ли введенное значение email'ом
//     // const isEmail = (input: string): boolean => {
//     //     return input.includes('@') && input.includes('.');
//     // };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');
//
//         try {
//             // Отправляем запрос на сервер
//             const response = await login({
//                 login: loginInput, // Сервер сам определит, email это или логин
//                 password: password
//             }).unwrap();
//
//             // При успешном ответе
//             dispatch(loginSuccess({
//                 user: {
//                     id: response.id,
//                     email: response.email,
//                     name: response.name || response.login,
//                     login: response.login
//                 }
//             }));
//
//             onClose();
//             onSuccess();
//
//
//
//             // Очистка формы
//             setLoginInput('');
//             setPassword('');
//
//         } catch (err: any) {
//             // Обработка ошибок
//             setError(err.data?.message || 'Ошибка при входе. Проверьте логин и пароль.');
//         }
//     };
//
//
//
//     return (
//         <ModalOverlay isOpen={isOpen} onClick={onClose}>
//             <Modal isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
//                 <ModalClose onClick={onClose}>&times;</ModalClose>
//                 <ModalHeader>
//                     <ModalTitle>Вход в аккаунт</ModalTitle>
//                     <ModalSubtitle>Войдите, чтобы присоединиться к стае</ModalSubtitle>
//                 </ModalHeader>
//                 <form onSubmit={handleSubmit}>
//                     <FormGroup>
//                         <FormLabel htmlFor="loginInput">Email или логин</FormLabel>
//                         <FormInput
//                             type="text"
//                             id="loginInput"
//                             placeholder="your@email.com или ваш логин"
//                             value={loginInput}
//                             onChange={(e) => setLoginInput(e.target.value)}
//                             required
//                             disabled={isLoading}
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <FormLabel htmlFor="loginPassword">Пароль</FormLabel>
//                         <FormInput
//                             type="password"
//                             id="loginPassword"
//                             placeholder="Ваш пароль"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             disabled={isLoading}
//                         />
//                     </FormGroup>
//
//                     {/* Отображение ошибки */}
//                     {error && (
//                         <div style={{
//                             color: '#dc3545',
//                             marginBottom: '15px',
//                             fontSize: '14px',
//                             textAlign: 'center'
//                         }}>
//                             {error}
//                         </div>
//                     )}
//
//                     <FormOptions>
//                         <RememberMe>
//                             <input type="checkbox" id="rememberMe" disabled={isLoading}/>
//                             <label htmlFor="rememberMe">Запомнить меня</label>
//                         </RememberMe>
//                         <ForgotPassword href="#">Забыли пароль?</ForgotPassword>
//                     </FormOptions>
//
//                     <FormSubmit
//                         type="submit"
//                         disabled={isLoading}
//                         style={{ opacity: isLoading ? 0.7 : 1 }}
//                     >
//                         {isLoading ? 'Вход...' : 'Войти'}
//                     </FormSubmit>
//
//                     <FormFooter>
//                         Нет аккаунта? <FormFooterLink
//                         href="#"
//                         onClick={onSwitchToRegister}
//                         style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
//                     >
//                         Зарегистрироваться
//                     </FormFooterLink>
//                     </FormFooter>
//                 </form>
//             </Modal>
//         </ModalOverlay>
//     );
// };









import {FC, useState} from 'react';
import {
    ForgotPassword, FormFooter, FormFooterLink,
    FormGroup, FormInput, FormLabel, FormOptions, FormSubmit,
    Modal,
    ModalClose,
    ModalHeader,
    ModalOverlay,
    ModalSubtitle,
    ModalTitle, RememberMe
} from "@/common/components/mainPage/modals/style.ts";
import {loginSuccess, setToken} from "@/store/reducers/authSlice.ts";
import {useAppDispatch} from "@/common/hooks/useAppSelector.ts";
import {useLoginMutation} from "@/store/reducers/auth/auth.ts";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
    onSuccess: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({isOpen, onClose, onSwitchToRegister, onSuccess}) => {
    const dispatch = useAppDispatch();
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login({
                login: loginInput,
                password: password
            }).unwrap();

            if (response.token) {
                dispatch(setToken(response.token));
            }

            dispatch(loginSuccess({
                user: {
                    id: response.id,
                    email: response.email,
                    name: response.name || response.login,
                    login: response.login,
                    token: response.token
                }
            }));

            onClose();
            onSuccess();

            setLoginInput('');
            setPassword('');

        } catch (err: any) {
            setError(err.data?.message || 'Ошибка при входе. Проверьте логин и пароль.');
        }
    };

    return (
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <Modal isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                <ModalClose onClick={onClose}>&times;</ModalClose>
                <ModalHeader>
                    <ModalTitle>Вход в аккаунт</ModalTitle>
                    <ModalSubtitle>Войдите, чтобы присоединиться к стае</ModalSubtitle>
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel htmlFor="loginInput">Email или логин</FormLabel>
                        <FormInput
                            type="text" // ИЗМЕНЕНО: было "email", стало "text"
                            id="loginInput"
                            placeholder="your@email.com или ваш логин"
                            value={loginInput}
                            onChange={(e) => setLoginInput(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="loginPassword">Пароль</FormLabel>
                        <FormInput
                            type="password"
                            id="loginPassword"
                            placeholder="Ваш пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </FormGroup>

                    {error && (
                        <div style={{
                            color: '#dc3545',
                            marginBottom: '15px',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <FormOptions>
                        <RememberMe>
                            <input type="checkbox" id="rememberMe" disabled={isLoading}/>
                            <label htmlFor="rememberMe">Запомнить меня</label>
                        </RememberMe>
                        <ForgotPassword href="#">Забыли пароль?</ForgotPassword>
                    </FormOptions>

                    <FormSubmit
                        type="submit"
                        disabled={isLoading}
                        style={{ opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading ? 'Вход...' : 'Войти'}
                    </FormSubmit>

                    <FormFooter>
                        Нет аккаунта? <FormFooterLink
                        href="#"
                        onClick={onSwitchToRegister}
                        style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
                    >
                        Зарегистрироваться
                    </FormFooterLink>
                    </FormFooter>
                </form>
            </Modal>
        </ModalOverlay>
    );
};