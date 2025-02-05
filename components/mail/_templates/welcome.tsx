import { Tailwind } from '@react-email/components';

type WelcomeTemplateProps = {
  personName: string;
};

const WelcomeTemplate = ({ personName }: WelcomeTemplateProps) => {
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

export default WelcomeTemplate;
