"use client";
import { useState } from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";
 
export default function SignIn() {
  const [password, setPassword] = useState("");
 
  const getStrength = (pwd) => {
    if (pwd.length === 0) return { width: "0%", color: "#333", text: "" };
    if (pwd.length < 6) return { width: "33%", color: "#B46A72", text: "Weak" };
    if (pwd.length < 10) return { width: "66%", color: "#FFF7E6", text: "Medium" };
    return { width: "100%", color: "#A8B58A", text: "Strong" };
  };
 
  const strength = getStrength(password);
 
  return (
    <main className="min-h-screen bg-black flex" style={{ color: "#F3F1EE", fontFamily: "Poppins, sans-serif" }}>
 
      {/* Left - Form */}
      <div className="relative flex flex-col items-center justify-center" style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        maxWidth: "600px",
        width: "90%",
        padding: "70px 50px",
        borderRadius: "0 40px 40px 0",
        boxSizing: "border-box"
      }}>

 
        {/* SIGN-In label */}
        <h2 style={{ position: "absolute", top: "25px", left: "30px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", color: "#777", fontWeight: 500 }}>
          SIGN-IN
        </h2>
 
        {/* Gradient line */}
        <div style={{ width: "100%", height: "2px", margin: "20px 0 30px", background: "linear-gradient(90deg, #FFF7E6, #F7C8D3, #B46A72, #A8B58A, #A9B7C6, #2D3A47)" }} />
 
        <h1 style={{ fontSize: "30px", marginBottom: "2px", fontWeight: 200, textAlign: "center" }}>
          Welcome back
        </h1>
        <p style={{ fontSize: "12px", color: "#B46A72", marginBottom: "18px" }}>
          Sign in to your Mochi account
        </p>
 
 
        {/* Email */}

        <div style={{ position: "relative", width: "100%", marginTop: "12px" }}>
          <label style={{ display: "block", color: "#7a7a7a", fontSize: "12px",
             marginBottom: "6px", textAlign: "left" }}>Email Address</label>
          <input
            type="email"
            placeholder="@mail.com"
            required
            className="signIn-btn"
            style={{ width: "100%", padding: "12px", paddingRight: "40px", border: "2px solid",borderColor:"#333", 
              borderRadius: "8px", background: "#262626", boxSizing: "border-box", color: "white", 
              transition: "transform 0.25s ease", outline:"none"}}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#A8B58A" strokeWidth="2" 
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: "absolute", right: "15px", bottom: "12px" }}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </div>
 
        {/* Password */}
        <div style={{ position: "relative", width: "100%", marginTop: "12px" }}>
          <label style={{ display: "block", color: "#7a7a7a", fontSize: "12px", marginBottom: "6px", textAlign: "left" }}>Password</label>
          <input
            type="password"
            placeholder="Password"
            color="#7a7a7a"
            maxLength={64}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signIn-btn"
            style={{ width: "100%", padding: "12px", paddingRight: "40px", border: "2px solid",
              borderColor:"#333", 
              borderRadius: "8px", background: "#262626", boxSizing: "border-box", color: "white", 
              transition: "transform 0.25s ease", outline:"none" }}
            />

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" 
          stroke="#A8B58A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: "absolute", right: "15px", top: "38px" }}>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 1 1 8 0v4" />
          </svg>
        </div>

        {/* Button */}
        <button className="signIn-btn" style={{
          width: "100%", padding: "16px", backgroundColor: "#2D3A47", color: "white",
          border: "2px solid #A9B7C6", borderRadius: "12px", fontSize: "16px",
          fontFamily: "Poppins, sans-serif", fontWeight: 200, cursor: "pointer",
          marginTop: "30px", transition: "transform 0.25s ease"
        }}>
          Sign in to Mochi
        </button>

 
        {/* Sign in link — only once, under the button */}
        <p className="flex-1 flex items-center justify-center" style={{ color: "#555", fontSize: "12px", marginTop: "16px" }}>
          Don't have an account?
          <Link href="/sign-up" style={{ color: "#7087BB" }}> Sign up free</Link>
        </p>
          {/*Google button*/}
         {/*line */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", margin: "16px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "#333" }} />
          <span style={{ color: "#555", fontSize: "12px" }}>sign-up with Google</span>
          <div style={{ flex: 1, height: "1px", background: "#333" }} />
        </div>
        <button className="signIn-btn" onClick={()=> signIn("google",{callbackUrl:"/dashboard"})}
          style={{
            width:"100%",
            padding:"14px",
            marginBottom:"10px",
            backgroundColor:"#333",
            color:"white",
            borderRadius:"12px",
            border:"2px solid #333",
            fontSize:"18px",
            fontFamily:"Poppins, sans-serif",
            cursor:"pointer",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:"10px",
            transition:"transform 0.25s",
            }}
            >
            <svg width="18"  height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
              Continue with Google
        </button>
        <style jsx>{`
                .signIn-btn {
                  outline: none;
                  transition: transform 0.25s ease;
                }
                .signIn-btn:hover {
                  transform: scale(1.02);
                }
                .signIn-btn:active {
                  transform: scale(0.98);
                }
                .signIn-btn:focus {
                  border-color: #A8B58A !important;
                  transform: scale(1.015);
                }
            `}</style>
      </div>
      {/* Right - Mascot */}
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#000000" }}>
        <div className="animate-float">
          <img src="/photos/MOCHI.png" alt="Mochi" style={{ width: "256px", height: "256px", objectFit: "contain" }} />
        </div>
      </div>
    </main>
  )}