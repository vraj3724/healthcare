import '@/app/global.css'; // ✅ Very important to load Tailwind CSS
import { WagmiContextProvider } from '@/providers/wagmi'; // yeh tumne upar banaya

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiContextProvider>
          {children}
        </WagmiContextProvider>
      </body>
    </html>
  );
}
