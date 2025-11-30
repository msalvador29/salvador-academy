import { Gloria_Hallelujah, Amatic_SC, Gaegu, Fuzzy_Bubbles, Patrick_Hand_SC, Yomogi, Indie_Flower } from "next/font/google";

const customFont = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
});

const customFont2 = Amatic_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const customFont3 = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const customFont4 = Fuzzy_Bubbles({
  subsets: ["latin"],
  weight: ["400"],
});

const customFont5 = Patrick_Hand_SC({
  subsets: ["latin"],
  weight: ["400"],
});

const customFont6 = Yomogi({
  subsets: ["latin"],
  weight: ["400"],
});

const customFont7 = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className={`pb-10 text-5xl font-bold text-center tracking-wider ${customFont3.className}`}>
          <span className="text-cyan-600">ma</span>
          th
          <span className="text-cyan-600">r</span>
          .
          <span className="text-cyan-600">io</span>
        </h1>
        <h1 className={`pb-10 text-5xl font-bold text-center tracking-wider ${customFont3.className}`}>
          salvador academy
        </h1>

        <h1 className={`text-5xl font-bold uppercase text-center tracking-wider ${customFont2.className}`}>What is a rate of change? How is it calculated?</h1>
        <p className={`my-8 text-black tracking-wider leading-12 text-2xl ${customFont.className}`}>
          A <span className="text-blue-500 underline-offset-8 underline">rate of change</span> is the amount that the <span className="bg-yellow-200 px-2">independent variable</span> changes by when the <span className="bg-blue-200 px-2">dependent variable</span> changes by 1.
        </p>
        <p className={`my-8 text-black tracking-wider leading-12 text-2xl text-center ${customFont3.className}`}>f(x)=2x<sup>2</sup>+3x+1</p>
        <p className={`my-8 text-black tracking-wider leading-12 text-2xl text-center ${customFont3.className}`}>f'(x)=4x+3</p>
        <h1 className={`pt-8 text-4xl font-bold uppercase text-center tracking-wider ${customFont5.className}`}>What is a rate of change<span className="text-pink-500">?</span> How is it calculated?</h1>
        <p className={`my-8 text-black tracking-wider leading-12 text-2xl ${customFont3.className}`}>
          A <span className="text-blue-500 underline-offset-8 underline">rate of change</span> is the amount that the <span className="text-pink-500 px-2">independent variable</span> changes by when the <span className="bg-blue-200 px-2">dependent variable</span> changes by 1.
        </p>
        <p className={`my-8 text-black tracking-wider leading-12 text-2xl ${customFont4.className}`}>
          A <span className="text-blue-500 underline-offset-8 underline">rate of change</span> is the amount that the <span className="bg-yellow-200 px-2">independent variable</span> changes by when the <span className="bg-blue-200 px-2">dependent variable</span> changes by 1.
        </p>
        <p className={`my-8 text-black tracking-wider leading-12 text-2xl ${customFont5.className}`}>
          A <span className="text-blue-500 underline-offset-8 underline">rate of change</span> is the amount that the <span className="bg-yellow-200 px-2">independent variable</span> changes by when the <span className="bg-blue-200 px-2">dependent variable</span> changes by 1.
        </p>
        <p className={`my-8 text-black tracking-wider leading-12 text-2xl ${customFont6.className}`}>
          A <span className="text-blue-500 underline-offset-8 underline">rate of change</span> is the amount that the <span className="bg-yellow-200 px-2">independent variable</span> changes by when the <span className="bg-blue-200 px-2">dependent variable</span> changes by 1.
        </p>
        <p className={`my-8 text-black tracking-wider leading-12 text-2xl ${customFont7.className}`}>
          A <span className="text-blue-500 underline-offset-8 underline">rate of change</span> is the amount that the <span className="bg-yellow-200 px-2">independent variable</span> changes by when the <span className="bg-blue-200 px-2">dependent variable</span> changes by 1.
        </p>
      </div>
    </main>
  );
}
