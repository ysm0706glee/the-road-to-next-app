type FooterProps = {
  activeOrganizationName: string;
};

const Footer = ({ activeOrganizationName }: FooterProps) => {
  return (
    <footer className="fixed bottom-0 w-full">
      <span className="text-sm">{activeOrganizationName}</span>
    </footer>
  );
};

export { Footer };
