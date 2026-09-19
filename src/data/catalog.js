export const SEED_ORDERS = [
  {
    id: 'CAT-1041',
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    customerName: 'Tunde Adeleke',
    phone: '+2348031234567',
    address: 'Block 4, Lekki Phase 1, Lagos',
    preferredDate: 'Today, 4:00 PM',
    productType: 'live',
    batchTier: '10 kg (Pond Special)',
    prepOption: 'Freshly Dressed & Degutted',
    estimatedPrice: 38000,
    status: 'Contacted',
    notes: 'Please pack heads and bellies cleanly for fisherman soup.'
  },
  {
    id: 'CAT-1042',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    customerName: 'Chef Amara Vance',
    phone: '+2348099887766',
    address: 'Roots Garden Bistro, Victoria Island',
    preferredDate: 'Tomorrow Morning (8:00 AM)',
    productType: 'smoked',
    batchTier: '25-Fish Party Pack',
    prepOption: 'Crispy Hard-Smoked',
    estimatedPrice: 65000,
    status: 'Pending Reply',
    notes: 'Must be thoroughly dried for long shelf-life.'
  },
  {
    id: 'CAT-1043',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    customerName: 'Ibrahim Danladi',
    phone: '+2348123459876',
    address: 'Gwarinpa Estate, 3rd Avenue, Abuja',
    preferredDate: 'This Friday',
    productType: 'live',
    batchTier: '25 kg (Wholesale Sack)',
    prepOption: 'Whole Live (Aerated Dispatch)',
    estimatedPrice: 92000,
    status: 'Pending Reply',
    notes: 'Need live delivery in aerated drums for backyard pool barbecue.'
  }
];

export const LIVE_TIERS = [
  { id: 'live-5kg', name: '5 kg', label: 'Family Basket', fishCount: '~4 to 6 mature fish', price: 19500, popular: false },
  { id: 'live-10kg', name: '10 kg', label: 'Pond Special', fishCount: '~8 to 12 mature fish', price: 38000, popular: true },
  { id: 'live-25kg', name: '25 kg', label: 'Wholesale Sack', fishCount: '~20 to 28 fish', price: 92000, popular: false },
  { id: 'live-50kg', name: '50 kg+', label: 'Commercial Tank', fishCount: '~45 to 60 jumbo fish', price: 180000, popular: false },
];

export const SMOKED_TIERS = [
  { id: 'smoked-5', name: '5-Fish Starter', label: 'Starter Carton', weightDesc: 'Avg 650g - 800g per fish', price: 14500, popular: false },
  { id: 'smoked-10', name: '10-Fish Pack', label: 'Family Carton', weightDesc: 'Kiln glazed & vacuum packed', price: 28000, popular: true },
  { id: 'smoked-25', name: '25-Fish Pack', label: 'Party & Catering', weightDesc: 'Optimal for restaurants/bars', price: 65000, popular: false },
  { id: 'smoked-50', name: '50-Fish Crate', label: 'Export / Banqueting', weightDesc: 'Air-tight export packing', price: 125000, popular: false },
];

export const LIVE_PREP_OPTIONS = [
  {
    id: 'Freshly Dressed & Degutted',
    title: 'Freshly Dressed & Degutted (Point & Kill)',
    description: 'Belly slit, gall bladder removed, ready for pot/grill'
  },
  {
    id: 'Whole Live (Aerated Tank Dispatch)',
    title: 'Whole Live (Aerated Dispatch)',
    description: 'Delivered alive swimming in aerated water barrels'
  }
];

export const SMOKED_PREP_OPTIONS = [
  {
    id: 'Soft-Moist Smoked (For Stews & Soups)',
    title: 'Soft-Moist Smoked',
    description: 'Tender flesh, yields deep broth essence for egusi & peppersoup'
  },
  {
    id: 'Crispy Hard-Smoked (Long Shelf-Life)',
    title: 'Crispy Hard-Smoked',
    description: 'Thoroughly kiln dried for long pantry life & crunch'
  }
];

export const DISPATCH_WINDOWS = [
  { value: 'Today (Next batch dispatch)', label: 'Today (Next Batch Dispatch)' },
  { value: 'Tomorrow Morning (8:00 AM - 11:00 AM)', label: 'Tomorrow Morning (8:00 AM - 11:00 AM)' },
  { value: 'Tomorrow Afternoon (1:00 PM - 4:00 PM)', label: 'Tomorrow Afternoon (1:00 PM - 4:00 PM)' },
  { value: 'Weekend BBQ Slot (Saturday)', label: 'Weekend BBQ Slot (Saturday)' },
  { value: 'Specific Date (Coordinate on WhatsApp)', label: 'Specific Date (Coordinate on WhatsApp)' }
];

export const STATUS_LIST = ['ALL', 'Pending Reply', 'Contacted', 'Confirmed', 'Dispatched', 'Completed'];
