
import React, { useState, useCallback, useEffect, useRef } from "react";

import {
  Backdrop,
  LoginCard,
  CloseBtn,
  LoginHeader,
  LoginAvatar,
  LoginTitle,
  LoginSubtitle,
  Form,
  FieldWrapper,
  Label,
  InputWrapper,
  InputIcon,
  Input,
  PasswordToggle,
  ErrorMsg,
  PasswordRules,
  RuleItem,
  ForgotLink,
  SubmitBtn,
  Divider,
  LoginFooter,
  SuccessToast,
} from "./login.styles";

/* ─────────────────────────────────────────────────────────
   ÍCONES SVG INLINE
───────────────────────────────────────────────────────── */
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconAlert = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const IconSuccess = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────
   REGRAS DE VALIDAÇÃO
───────────────────────────────────────────────────────── */
const USERNAME_RULES = [
  {
    key:  "length",
    test: (v) => v.length >= 4,
    msg:  "Mínimo 4 caracteres",
  },
  {
    key:  "chars",
    test: (v) => /^[a-zA-Z0-9._-]+$/.test(v),
    msg:  "Apenas letras, números, . _ -",
  },
  {
    key:  "noSpace",
    test: (v) => !/\s/.test(v),
    msg:  "Sem espaços",
  },
];

const PASSWORD_RULES = [
  {
    key:  "length",
    test: (v) => v.length >= 8,
    msg:  "Mínimo 8 caracteres",
  },
  {
    key:  "upper",
    test: (v) => /[A-Z]/.test(v),
    msg:  "Pelo menos uma letra maiúscula",
  },
  {
    key:  "lower",
    test: (v) => /[a-z]/.test(v),
    msg:  "Pelo menos uma letra minúscula",
  },
  {
    key:  "number",
    test: (v) => /[0-9]/.test(v),
    msg:  "Pelo menos um número",
  },
  {
    key:  "special",
    test: (v) => /[!@#$%^&*(),.?":{}|<>_\-+=/\\]/.test(v),
    msg:  "Pelo menos um caractere especial",
  },
];

const validate = (username, password) => {
  const errs = {};
  if (!USERNAME_RULES.every((r) => r.test(username))) {
    errs.username = "Username inválido";
  }
  if (!PASSWORD_RULES.every((r) => r.test(password))) {
    errs.password = "Senha não atende aos requisitos";
  }
  return errs;
};

/* ─────────────────────────────────────────────────────────
   LoginModal
   Props:
     isOpen  → boolean
     onClose → () => void
───────────────────────────────────────────────────────── */
function LoginModal({ isOpen, onClose }) {
  const [username,    setUsername]    = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [errors,      setErrors]      = useState({});
  const [touched,     setTouched]     = useState({});
  const [isLoading,   setIsLoading]   = useState(false);
  const [shake,       setShake]       = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [showPwRules, setShowPwRules] = useState(false);

  const inputRef = useRef(null);

  /* foca no input ao abrir */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      /* reset ao fechar */
      setUsername("");
      setPassword("");
      setErrors({});
      setTouched({});
      setSuccess(false);
      setShowPass(false);
      setShowPwRules(false);
    }
  }, [isOpen]);

  /* fecha com Escape */
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  /* validação em tempo real quando o campo foi tocado */
  useEffect(() => {
    if (touched.username || touched.password) {
      setErrors(validate(username, password));
    }
  }, [username, password, touched]);

  const handleBlur = useCallback((field) => {
    setTouched((t) => ({ ...t, [field]: true }));
  }, []);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    const errs = validate(username, password);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      triggerShake();
      return;
    }

    setIsLoading(true);
    /* Simula requisição de autenticação — substitua pelo seu endpoint */
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);
    setSuccess(true);
    setTimeout(() => { onClose(); }, 2000);
  }, [username, password, triggerShake, onClose]);

  if (!isOpen) return null;

  return (
    <Backdrop onClick={(e) => e.target === e.currentTarget && onClose()}>
      <LoginCard $shake={shake}>

        {/* Botão fechar */}
        <CloseBtn onClick={onClose} aria-label="Fechar">
          <IconClose />
        </CloseBtn>

        {success ? (
          /* ── Estado de sucesso ── */
          <SuccessToast>
            <div className="icon"><IconSuccess /></div>
            <h3>Bem-vindo!</h3>
            <p>Login realizado com sucesso.</p>
          </SuccessToast>
        ) : (
          <>
            {/* ── Cabeçalho ── */}
            <LoginHeader>
              <LoginAvatar>
                <IconUser />
              </LoginAvatar>
              <LoginTitle>Entrar na conta</LoginTitle>
              <LoginSubtitle>
                Acesse o painel administrativo do portfólio
              </LoginSubtitle>
            </LoginHeader>

            {/* ── Formulário ── */}
            <Form onSubmit={handleSubmit} noValidate>

              {/* Username */}
              <FieldWrapper>
                <Label htmlFor="login-username">Username</Label>
                <InputWrapper>
                  <InputIcon><IconUser /></InputIcon>
                  <Input
                    id="login-username"
                    ref={inputRef}
                    type="text"
                    autoComplete="username"
                    placeholder="seu.username"
                    value={username}
                    $error={touched.username && errors.username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                    onBlur={() => handleBlur("username")}
                    aria-describedby="username-error"
                    aria-invalid={!!(touched.username && errors.username)}
                  />
                </InputWrapper>
                {touched.username && errors.username && (
                  <ErrorMsg id="username-error">
                    <IconAlert /> {errors.username}
                  </ErrorMsg>
                )}
              </FieldWrapper>

              {/* Password */}
              <FieldWrapper>
                <Label htmlFor="login-password">Senha</Label>
                <InputWrapper>
                  <InputIcon><IconLock /></InputIcon>
                  <Input
                    id="login-password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    $error={touched.password && errors.password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur("password")}
                    onFocus={() => setShowPwRules(true)}
                    aria-describedby="password-error"
                    aria-invalid={!!(touched.password && errors.password)}
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
                    tabIndex={-1}
                  >
                    {showPass ? <IconEyeOff /> : <IconEye />}
                  </PasswordToggle>
                </InputWrapper>

                {/* Regras de senha — visíveis ao focar */}
                {showPwRules && (
                  <PasswordRules aria-live="polite">
                    {PASSWORD_RULES.map((rule) => (
                      <RuleItem key={rule.key} $ok={rule.test(password)}>
                        <IconCheck size={12} />
                        {rule.msg}
                      </RuleItem>
                    ))}
                  </PasswordRules>
                )}

                {touched.password && errors.password && (
                  <ErrorMsg id="password-error">
                    <IconAlert /> {errors.password}
                  </ErrorMsg>
                )}
              </FieldWrapper>

              <ForgotLink href="#" onClick={(e) => e.preventDefault()}>
                Esqueci minha senha
              </ForgotLink>

              <SubmitBtn type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round"
                      style={{ animation: "spin 0.8s linear infinite" }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Autenticando…
                  </>
                ) : "Entrar →"}
              </SubmitBtn>

            </Form>

            <Divider><span>ou</span></Divider>

            <LoginFooter>
              Não tem uma conta?{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Solicitar acesso
              </a>
            </LoginFooter>
          </>
        )}
      </LoginCard>

      {/* spin keyframe inline — apenas para o loader */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Backdrop>
  );
}

export default LoginModal;