// =============================================================================
// Edge Function: telegram-webhook
// =============================================================================
// Получает payload от Database Trigger (pg_net),
// загружает шаблон из notification_templates,
// заменяет плейсхолдеры {{key}} и отправляет в Telegram.
// =============================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// ─── Экранирование HTML ────────────────────────────────────────────────────────
function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ─── Дефолтные шаблоны если в БД нет строки ────────────────────────────────────
const DEFAULT_TEMPLATES: Record<string, string> = {
  cosharing_listings: `🚗 <b>Новое объявление Co-Sharing</b>

📌 <b>Заголовок:</b> {{headline}}
📝 <b>Описание:</b> {{description}}
📅 <b>Дата выезда:</b> {{departure_datetime}}
📍 <b>Точка сбора:</b> {{pickup_location}}
🗺 <b>Google Maps:</b> {{maps_url}}

👤 <b>Контакты автора:</b>
{{author_social_link}}`,

  tour_requests: `🏔 <b>Новая заявка на тур</b>

<b>Тур:</b> {{tour_title}}
<b>Имя:</b> {{client_name}}
<b>Контакт:</b> {{contact_info}}
<b>Гостей:</b> {{guests_count}}
<b>Сумма:</b> {{estimated_price}}`,

  transfer_orders: `🚘 <b>Новый заказ трансфера</b>

<b>Имя:</b> {{customer_name}}
<b>Телефон:</b> {{contact_number}}
<b>Направление:</b> {{destination}}
<b>Точка подачи:</b> {{pickup_location}}
<b>Класс авто:</b> {{car_class}}
<b>Пассажиров:</b> {{passengers_count}}`,

  event_tickets: `🎟 <b>Новая покупка билета</b>

<b>Событие:</b> {{tour_slug}}
<b>Имя:</b> {{client_name}}
<b>Email:</b> {{email}}
<b>Контакт:</b> {{contact_info}}
<b>Гостей:</b> {{guests_count}}`,

  tour_requests_partner: `📥 <b>Новая заявка по вашей ссылке!</b>

<b>Тур:</b> {{tour_title}}
<b>Имя:</b> {{client_name}}
<b>Гостей:</b> {{guests_count}}
<b>Сумма:</b> {{estimated_price}}
<i>Статус: В обработке</i>`,

  tour_requests_paid_partner: `💰 <b>FINAL DEAL DETAILS:</b>
• <b>Client:</b> {{client_name}}
• <b>Final Sale Amount:</b> [\${{final_price_usd}} / {{final_price_kzt}} ₸]
• <b>Your Earned Commission (X%):</b> [\${{partner_commission_usd}} / {{partner_commission_kzt}} ₸]`,
};

function renderTemplate(template: string, record: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => {
    const value = record[key];
    if (value === null || value === undefined || value === "") {
      return "—";
    }
    const strVal = String(value);
    const isoMatch = strVal.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);
    if (isoMatch) {
      return `${isoMatch[1]} ${isoMatch[2]}`;
    }
    return strVal;
  });
}

// ─── Маскирование номеров телефонов ────────────────────────────────────────────
function maskContact(contact: unknown): string {
  if (!contact) return "—";
  const str = String(contact).trim();
  if (str.length <= 6) return str.slice(0, 2) + "***";
  const start = str.slice(0, 5);
  const end = str.slice(-3);
  return `${start} *** *${end}`;
}

const TOUR_MAP: Record<string, { title: string; pricePerGuestKzt: number; usdApprox: number }> = {
  "tour1-essential": { title: "Essential Comfort (2 Lakes + 1 Canyon)", pricePerGuestKzt: 13990, usdApprox: 31 },
  "tour2-essential": { title: "Maximum Coverage (3 Canyons + 2 Lakes)", pricePerGuestKzt: 18990, usdApprox: 42 },
  "tour3-essential": { title: "Overnight Stay (All Canyons & Lakes 2 Days)", pricePerGuestKzt: 25990, usdApprox: 57 },
  "sovet-peak-4317m": { title: "Soviet Peak (4,317m) 2-Day Expedition", pricePerGuestKzt: 140000, usdApprox: 290 },
};

   // ... rest of the implementation truncated for brevity