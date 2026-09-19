# 🐟 Whiskers & Ponds Farmstead

> Fresh spring-fed & kiln-smoked African catfish ordering web application with live queue tickets, real-time admin management, dynamic pricing control, and responsive design.

![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Lucide Icons](https://img.shields.io/badge/Lucide-React-F56565?style=flat-square)

---

## 🌟 Key Features

- **Pond-to-Plate Storefront (`/`)**:
  - Browse Fresh Live Catfish (purged in spring water for 48 hrs) and Kiln-Smoked Catfish (cured 18 hrs over hardwood fruitwood).
  - Select quantity tiers (Starter, Family Feast, Commercial Crate) and preparation styles (Whole Alive, Gutted & Washed, Cut in Steaks, Deboned Fillets).
  - **High-Impact Calling CTA**: Energetic vibrating **"ORDER NOW"** button with amber-flame gradient, radiating pulse rings, and live ping beacon.
  - Generates instant `#CAT-XXXX` queue tickets with 1-click WhatsApp booking message integration.

- **Admin Control Panel (`/admindb`)**:
  - Accessible directly at the dedicated URL `/admindb`.
  - **Orders Queue**: Track, filter, search, update status (Pending, Contacted, Confirmed, Dispatched, Completed), and send 1-click WhatsApp customer replies.
  - **Pricing Manager**: Real-time price edits and stock availability toggles per tier that sync across browser tabs via persistent state.
  - **Analytics**: Key performance indicators, pipeline valuation, product distribution, and revenue statistics.

- **Atmospheric Ambiance & Aquatic Effects**:
  - Live swimming catfish background animations.
  - Floating air bubbles, shimmering glassmorphism cards, and fluid underwater gradients.

- **Complete Multi-Device Responsiveness**:
  - Mobile (320px–430px), Tablet (768px–1024px), Desktop (1440px+).

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ogungbile-hue/whiskers-and-ponds.git
   cd whiskers-and-ponds
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Access the Admin Dashboard**:
   Navigate to `http://localhost:5173/admindb` or click the **"Queue Board"** button in the header.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS + Custom Aquatic & Vibration Keyframes
- **Icons**: Lucide React
- **Routing**: Lightweight History API Router (`pushState` / `popstate`)
- **State & Storage**: React Hooks (`useOrders`, `usePrices`, `useRouter`) with `localStorage` persistence

---

## 📄 License

MIT © [Whiskers & Ponds Farmstead](https://github.com/ogungbile-hue/whiskers-and-ponds)
