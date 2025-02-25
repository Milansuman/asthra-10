import { Tailwind } from '@react-email/components';

type EmailProps = {
  eventId: string;
  eventName: string;
  personName: string;
};

export const AsthraPass = (data: EmailProps) => {
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
      {JSON.stringify(data)}
    </Tailwind>
  );
};

export default AsthraPass;