import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased selection:bg-yellow-400 selection:text-[#071A2F]">
            <Head title="Lupa Password - Inspekto UPTD" />

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

                                <img
                                    src="/image/logo_disnakertrans.png"
                                    alt="Logo Disnaker"
                                    className="h-[78px] w-auto drop-shadow-md"
                                    loading="lazy"
                                />

                            </div>

                            <div>
                                <p className="mb-2 text-sm font-bold tracking-[0.25em] text-yellow-400/90 uppercase">
                                    Portal Data
                                </p>

                                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl drop-shadow-sm">
                                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                                        Inspekto
                                    </span>{' '}
                                    <span className="font-extrabold">
                                        UPTD
                                    </span>
                                </h1>
                            </div>
                        </div>

                        <p className="mt-10 text-lg font-medium leading-relaxed text-slate-300">
                            Pengawasan Ketenagakerjaan Wilayah II Bekasi dan Karawang.
                        </p>

                        <p className="mt-5 border-l-4 border-yellow-400/50 pl-5 text-base font-light italic leading-relaxed text-slate-400">
                            "Informasi dan Sistem Pengawasan Elektronik Ketenagakerjaan Terpadu Online."
                        </p>

                    </div>
                </section>

                {/* Forgot Password Form (Right) */}
                <section className="relative z-10 flex items-center justify-center bg-slate-50 px-8 py-12 lg:w-1/2 lg:px-16">
                    <div className="w-full max-w-md xl:max-w-lg">

                        {/* Back to Login */}
                        <Link
                            href={route('login')}
                            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#071A2F]"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Kembali ke Login
                        </Link>

                        {/* Header Form */}
                        <div className="mb-12">
                            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
                                Lupa Password?
                            </h2>

                            <p className="mt-4 text-base leading-relaxed text-slate-500">
                                Tidak masalah. Masukkan email Anda dan kami akan mengirimkan
                                kode OTP untuk membuat password baru.
                            </p>
                        </div>

                        {/* Session Status */}
                        {status && (
                            <div className="mb-6 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-7">

                            {/* Email Address */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-bold text-slate-700"
                                >
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
                                        className="block w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 shadow-sm transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-400/20"
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className={`group relative mt-4 flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#071A2F] px-5 py-4 text-base font-bold text-white shadow-lg shadow-[#071A2F]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#071A2F]/30 focus:outline-none focus:ring-4 focus:ring-[#071A2F]/30 active:translate-y-0 ${
                                    processing
                                        ? 'cursor-not-allowed opacity-70'
                                        : ''
                                }`}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {processing
                                        ? 'Mengirim...'
                                        : 'Kirim Kode OTP'}

                                    {!processing && (
                                        <svg
                                            className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
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
