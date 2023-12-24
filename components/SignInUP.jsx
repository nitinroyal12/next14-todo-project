"use client"
import { useEffect, useState } from "react"
import "./signinup.css"
import { useFormik } from "formik"
import { SignIn, SignUP } from "./Yup"
import { Submitdata, loginuser } from "@action/registeruser"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"


const SignInUp = () => {
    const route = useRouter()
    const token = localStorage.getItem("token")
    const [first, setfirst] = useState(false)
    const [toggle, settoggle] = useState(true)
    const login = {
        email: "",
        password: ""
    }
    const register = {
        name: "",
        email: "",
        password: ""
    }
    const { values: loginValues,
        errors: loginErrors,
        touched: loginTouched,
        handleBlur: loginHandleBlur,
        handleChange: loginHandleChange,
        handleSubmit: loginHandleSubmit } = useFormik({
            initialValues: login,
            validationSchema: SignIn,
            onSubmit: async (value, action) => {
                try {
                    const res = await loginuser(value)

                    if (res.status === "ok") {
                        toast.success(res.message)
                        localStorage.setItem("email", res.email)
                        localStorage.setItem("token", res.token)
                        route.push("/dashbord")
                    } else {
                        toast.error(res.message)
                    }
                } catch (err) {
                    console.log(err.message);
                }
            },

        })
    const { values: registerValues,
        errors: registerErrors,
        touched: registerTouched,
        handleBlur: registerHandleBlur,
        handleChange: registerHandleChange,
        handleSubmit: registerHandleSubmit } = useFormik({
            initialValues: register,
            validationSchema: SignUP,
            onSubmit: async (value, action) => {
                try {
                    const res = await Submitdata(value)
                    if (res.status === "ok") {
                        action.resetForm()
                        toast.success(res.message)
                        setfirst(false)
                    } else {
                        toast.error(res.message)
                    }
                }
                catch (err) {
                    console.log(err);
                }
            },
            

        })
        useEffect(()=>{
            if(token){
                route.push("/dashbord")
            }
        })
    return (
        <div>
            <div className="main">
                <div className={first ? "container a-container" : "container a-container is-txl"} id="a-container">
                    <form className="form" id="a-form" onSubmit={registerHandleSubmit}>
                        <h2 className="form_title title">Create Account</h2>

                        <input className="form__input" type="text" placeholder="Name" name="name" value={registerValues.name} onBlur={registerHandleBlur} onChange={registerHandleChange} />
                        {registerErrors.name && registerTouched.name ? <p className="text-sm ps-2 text-red-300 ">{registerErrors.name} </p> : null}
                        <input className="form__input" type="text" placeholder="Email" name="email" value={registerValues.email} onBlur={registerHandleBlur} onChange={registerHandleChange} />
                        {registerErrors.email && registerTouched.email ? <p className="text-sm ps-2 text-red-300 ">{registerErrors.email} </p> : null}
                        <div className="relative ">
                            <input className="form__input " type={toggle ? "password" : "text"} placeholder="Password" name="password" value={registerValues.password} onBlur={registerHandleBlur} onChange={registerHandleChange} />{toggle ? <FontAwesomeIcon className="absolute top-4 right-3 text-lg cursor-pointer" icon={faEye} onClick={() => settoggle(false)} /> : <FontAwesomeIcon className="absolute top-4 right-3 text-lg cursor-pointer" icon={faEyeSlash} onClick={() => settoggle(true)} />}
                            {registerErrors.password && registerTouched.password ? <p className="text-sm ps-2 text-red-300 text-center">{registerErrors.password} </p> : null}
                        </div>


                        <button type="submit" className="form__button button submit">SIGN UP</button>
                    </form>
                </div>
                <div className={first ? "container b-container" : "container b-container is-txl is-z200 "} id="b-container">
                    <form className="form" id="b-form" method="" action="" onSubmit={loginHandleSubmit}>
                        <h2 className="form_title title">Sign in to Website</h2>

                        <input className="form__input" type="text" placeholder="Email" name="email" value={loginValues.email} onBlur={loginHandleBlur} onChange={loginHandleChange} />
                        {loginErrors.email && loginTouched.email ? <p className="text-sm ps-2 text-red-300 ">{loginErrors.email} </p> : null}
                        <div className="relative">
                            <input className="form__input" type={toggle ? "password" : "text"} placeholder="Password" name="password" value={loginValues.password} onBlur={loginHandleBlur} onChange={loginHandleChange} />
                            {toggle ? <FontAwesomeIcon className="absolute top-4 right-3 text-lg cursor-pointer" icon={faEye} onClick={()=>settoggle(false)} /> : <FontAwesomeIcon className="absolute top-4 right-3 text-lg cursor-pointer" icon={faEyeSlash}  onClick={()=>settoggle(true)}/>}
                            {loginErrors.password && loginTouched.password ? <p className="text-sm ps-2 text-red-300 text-center">{loginErrors.password}</p> : null}
                        </div>

                        <a className="form__link">Forgot your password?</a>
                        <button type="submit" className="form__button button submit" >SIGN IN </button>
                    </form>
                </div>
                <div className={first ? "switch" : " switch is-txr"} id="switch-cnt">
                    <div className={first ? "switch__circle" : " switch__circle is-txr"}></div>
                    <div className={`${first ? "switch__circle" : " switch__circle is-txr"} switch__circle--t`}></div>
                    <div className={first ? "switch__container" : "switch__container is-hidden"} id="switch-c1">
                        <h2 className="switch__title title">Welcome Back !</h2>
                        <p className="switch__description description">To keep connected with us please login with your personal info</p>
                        <button className="switch__button button switch-btn" onClick={() => { setfirst(false) }}>SIGN IN</button>
                    </div>
                    <div className={first ? "switch__container is-hidden" : "switch__container"} id="switch-c2">
                        <h2 className="switch__title title">Hello Friend !</h2>
                        <p className="switch__description description">Enter your personal details and start journey with us</p>
                        <button className="switch__button button switch-btn" onClick={() => { setfirst(true) }}>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInUp