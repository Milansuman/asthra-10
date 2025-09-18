"use client"


const Home = () => {

  return (
    <div className="p-8 text-black text-center align-middle">
      <h1 className="text-4xl font-bold italic">This is the feedback form password:</h1>
      <p className="mt-4 font-black text-4xl">ASTHRA_PASS_123</p>
      <p className=" mt-6 text-lg text-neutral-500">This password is to be given to your event participants at some point during the event.
        <strong>Participants will not be able to access their certificates without this password.</strong>
        This password will be used to access the feedback form for asthra. They will be able to access their certificates only after submitting the feedback form.
        They will recieve the feedback form in their registered email address after the event is complete.
      </p>
    </div >
  );
};



export default Home;
