export type FormVariant = 'client' | 'creator';

export const getFormTheme = (variant: FormVariant = 'client') => {
  const themes = {
    client: {
      ring: 'focus:ring-blue-500',
      ringWithin: 'focus-within:ring-blue-500',
      ringSelected: 'ring-blue-500',
      ringLight: 'focus:ring-blue-300',
      border: 'border-blue-500',
      borderHover: 'hover:border-blue-300',
      bgSelected: 'bg-blue-50',
      textSelected: 'text-blue-700',
      accent: 'text-blue-500',
      checkbox: 'text-blue-600',
      accentColor: 'accent-blue-600',
      tagBg: 'bg-blue-50',
      tagText: 'text-blue-700',
      tagHover: 'hover:bg-blue-100',
      tagBorder: 'border border-blue-200'
    },
    creator: {
      ring: 'focus:ring-orange-300',
      ringWithin: 'focus-within:ring-orange-300',
      ringSelected: 'ring-orange-300',
      ringLight: 'focus:ring-orange-300',
      border: 'border-orange-500',
      borderHover: 'hover:border-orange-300',
      bgSelected: 'bg-orange-50',
      textSelected: 'text-orange-500',
      accent: 'text-orange-500',
      checkbox: 'text-orange-600',
      accentColor: 'accent-orange-500',
      tagBg: 'bg-orange-50',
      tagText: 'text-orange-500',
      tagHover: 'hover:bg-orange-100',
      tagBorder: 'border border-orange-200'
    }
  };

  return themes[variant] || themes.client;
};
