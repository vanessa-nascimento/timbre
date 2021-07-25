import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import partyPopper from '@iconify-icons/mdi/party-popper';
import crownSimpleFill from '@iconify-icons/ph/crown-simple-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'eventos próximos',
    path: '/eventos',
    icon: getIcon(partyPopper)
  },
  {
    title: 'Modo Convidado',
    path: '/painel-convidado',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Modo anfitrião',
    path: '/painel-anfitriao',
    icon: getIcon(crownSimpleFill)
  },
];

export default sidebarConfig;
