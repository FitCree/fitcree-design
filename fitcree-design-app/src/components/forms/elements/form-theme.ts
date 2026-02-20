export type FormVariant = 'client' | 'creator';

export const getFormTheme = (variant: FormVariant = 'client') => {
  const themes = {
    client: {
      ring: 'focus:ring-blue-500',
      ringLight: 'focus:ring-blue-300',
      border: 'border-blue-500',
      borderHover: 'hover:border-blue-300',
      bgSelected: 'bg-blue-50',
      textSelected: 'text-blue-700',
      accent: 'text-blue-500',
      checkbox: 'text-blue-600',
      tagBg: 'bg-blue-50',
      tagText: 'text-blue-700',
      tagHover: 'hover:bg-blue-100'
    },
    creator: {
      ring: 'focus:ring-orange-500',
      ringLight: 'focus:ring-orange-300',
      border: 'border-orange-500',
      borderHover: 'hover:border-orange-300',
      bgSelected: 'bg-orange-50',
      textSelected: 'text-orange-700',
      accent: 'text-orange-500',
      checkbox: 'text-orange-600',
      tagBg: 'bg-orange-50',
      tagText: 'text-orange-700',
      tagHover: 'hover:bg-orange-100'
    }
  };

  return themes[variant] || themes.client;
};
