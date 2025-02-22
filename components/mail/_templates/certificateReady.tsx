import { Tailwind } from '@react-email/components';

type CertificateReadyProps = {
  personName: string;
};

const CertificateReady = ({ personName }: CertificateReadyProps) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#007291',
            },
          },
        },
      }}
    >
      {JSON.stringify(personName)}
    </Tailwind>
  );
};

export default CertificateReady;
