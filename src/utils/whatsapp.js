export const FARM_HOTLINE_PHONE = '2348000000000'; // Farm desk hotline placeholder

/**
 * Generate prefilled WhatsApp link for the customer to message the farm desk with their ticket.
 */
export function getCustomerWhatsAppUrl(ticket) {
  const itemType = ticket.productType === 'live' ? 'Fresh Live Catfish' : 'Kiln-Smoked Catfish';
  const text = `Hello Whiskers & Ponds! 🐟\n\nI just placed an order on your queue board.\n\n*Ticket ID:* #${ticket.id}\n*Customer:* ${ticket.customerName}\n*Item:* ${ticket.batchTier} [${itemType}]\n*Style:* ${ticket.prepOption}\n*Delivery To:* ${ticket.address}\n*Preferred Time:* ${ticket.preferredDate}\n*Estimated Total:* ₦${ticket.estimatedPrice?.toLocaleString()}\n\nPlease confirm stock availability and send account payment details!`;
  return `https://wa.me/${FARM_HOTLINE_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate prefilled WhatsApp link for the farm manager to reply directly to the customer.
 */
export function getFarmerReplyWhatsAppUrl(ticket) {
  const phoneDigits = ticket.phone.replace(/[^0-9]/g, '');
  const message = `Hello ${ticket.customerName}! 🌿 This is Manager David from Whiskers & Ponds Farm.\n\nRegarding your Catfish Queue Ticket *#${ticket.id}* (${ticket.batchTier} - ${ticket.prepOption}):\n\n✅ Your fresh batch has been reserved.\n📍 Delivery set for: ${ticket.preferredDate} to ${ticket.address}.\n💰 Total: ₦${ticket.estimatedPrice?.toLocaleString()}.\n\nKindly reply to confirm if you'd like us to dispatch our point-and-kill or live aerated tanker!`;
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}
