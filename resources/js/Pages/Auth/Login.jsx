import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased selection:bg-yellow-400 selection:text-[#071A2F]">
            <Head title="Login - Inspekto UPTD" />
            
            <div className="min-h-screen lg:flex">
                
                {/* Branding / Description (Left) */}
                <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#071A2F] via-[#0A2540] to-[#071A2F] px-8 py-16 text-white lg:w-1/2 lg:px-16 lg:py-24">
                    
                    {/* Decorative accents */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -left-20 top-0 h-[600px] w-[600px] rounded-full bg-yellow-400/10 blur-[120px] mix-blend-screen"></div>
                        <div className="absolute -bottom-32 -right-20 h-[700px] w-[700px] rounded-full bg-sky-500/10 blur-[150px] mix-blend-screen"></div>
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
                    </div>

                    <div className="relative z-10 w-full max-w-2xl">
                        {/* Logo & Title Area */}
                        <div className="flex items-center gap-6">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.25rem] bg-white/5 shadow-inner shadow-white/10 ring-1 ring-white/20 backdrop-blur-md transition-transform hover:scale-105">
                                {/* Pastikan gambar logo ada di folder public/image/ */}
                                <img
                                    src="/image/logo_disnakertrans.png"
                                    alt="Logo Disnaker"
                                    className="h-[78px] w-auto drop-shadow-md"
                                    loading="lazy"
                                />
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-bold tracking-[0.25em] text-yellow-400/90 uppercase">Portal Data</p>
                                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl drop-shadow-sm">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Inspekto</span> UPTD
                                </h1>
                            </div>
                        </div>

                        <p className="mt-10 text-lg font-medium leading-relaxed text-slate-300">
                           Pengawasan Ketenagakerjaan Wilayah II Bekasi dan Karawang.
                        </p>

                        <p className="mt-5 text-base font-light italic leading-relaxed text-slate-400 border-l-4 border-yellow-400/50 pl-5">
                            "Informasi dan Sistem Pengawasan Elektronik Ketenagakerjaan Terpadu Online."
                        </p>

                        {/* Features Grid */}
                        <div className="mt-14 grid gap-6 sm:grid-cols-2">
                            <div className="group rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:ring-white/20">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-400 transition-colors group-hover:bg-yellow-400 group-hover:text-[#071A2F]">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <p className="text-base font-semibold text-white">Aman & Terverifikasi</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                    Sistem login menggunakan autentikasi resmi aplikasi untuk melindungi akses.
                                </p>
                            </div>
                            <div className="group rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:ring-white/20">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-400/20 text-sky-400 transition-colors group-hover:bg-sky-400 group-hover:text-[#071A2F]">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <p className="text-base font-semibold text-white">Terpadu & Efisien</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                    Satu portal untuk pemantauan informasi ketenagakerjaan secara terintegrasi.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Login Form (Right) */}
                <section className="flex items-center justify-center bg-slate-50 px-8 py-12 lg:w-1/2 lg:px-16 relative z-10">
                    <div className="w-full max-w-md xl:max-w-lg">
                        
                        {/* Header Form */}
                        <div className="mb-12">
                            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Selamat Datang</h2>
                            <p className="mt-4 text-base text-slate-500 leading-relaxed">
                                Silakan masukkan email dan Password Anda untuk mengakses dashboard.
                            </p>
                        </div>

                        {/* Session Status */}
                        {status && (
                            <div className="mb-6 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-7">
                            {/* Email Address */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoFocus
                                        autoComplete="username"
                                        placeholder="contoh@gmail.com"
                                        className="block w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 text-base hover:border-slate-300 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-400/20"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')} className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>
                                <div className="mt-2.5">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="block w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 tracking-widest text-base hover:border-slate-300 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-400/20"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center pt-2">
                                <label htmlFor="remember_me" className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            id="remember_me"
                                            name="remember"
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white transition-all checked:border-transparent checked:bg-[#071A2F] focus:outline-none focus:ring-2 focus:ring-[#071A2F]/20 focus:ring-offset-2"
                                        />
                                        <svg className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-base font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Ingat saya</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className={`group mt-4 relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#071A2F] px-5 py-4 text-base font-bold text-white shadow-lg shadow-[#071A2F]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#071A2F]/30 focus:outline-none focus:ring-4 focus:ring-[#071A2F]/30 active:translate-y-0 ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {processing ? 'Memproses...' : 'Masuk ke Dashboard'}
                                    {!processing && (
                                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                        </form>
                        
                        <p className="mt-14 text-center text-sm font-medium text-slate-400">
                            &copy; {new Date().getFullYear()} Inspekto UPTD. All rights reserved.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
