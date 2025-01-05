import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Email = () => {
  const [isOpenedForm, setIsOpenedForm] = useState(false);
  const [isOpenedHistory, setIsOpenedHistory] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const user = JSON.parse(localStorage.getItem("EmailSenderAppUserData"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    defaultValues: {
      sender: user.email,
      recipient: "",
      subject: "",
      body: "",
    },
  });

  const handleGetHistoryOfMails = async () => {
    setIsOpenedHistory(true);

    try {
      const response = await axios.get("http://68.183.74.14:4005/api/emails", {
        headers: {
          Authorization: "Basic " + btoa(`${user.username}:${user.password}`),
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    setGlobalError("");

    console.log(user);
    console.log(data);

    try {
      const response = await axios.post(
        "http://68.183.74.14:4005/api/emails",
        {
          sender: user.id,
          recipient: data.recipient,
          subject: data.subject,
          message: data.message,
        },
        {
          headers: {
            Authorization: "Basic " + btoa(`${user.username}:${user.password}`),
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      setGlobalError("Error. Try again");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col gap-4">
      <div className="mb-6 bg-gray-100 p-4 rounded-md flex justify-between">
        <div>
          <p className="text-lg font-bold">Hello, {user.username}</p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Exit
        </button>
      </div>

      {isOpenedForm ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 bg-white p-4 rounded-md shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Create new email</h2>
          <div className="mb-4">
            <label htmlFor="sender" className="block text-gray-600">
              Sender
            </label>
            <input
              id="sender"
              type="email"
              value={user.email}
              disabled
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              {...register("sender")}
            />
            {errors.sender && (
              <p className="text-red-500">{errors.sender.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="recipient" className="block text-gray-600">
              Recipient
            </label>
            <input
              id="recipient"
              type="email"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Enter recipient email"
              {...register("recipient", {
                required: "Recipient is required",
                pattern: {
                  value: regexEmail,
                  message: "Please provide valid email",
                },
              })}
            />
            {errors.recipient && (
              <p className="text-red-500">{errors.recipient.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-600">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Enter mail theme"
              {...register("subject", {
                maxLength: {
                  value: 80,
                  message: "Max length is 80",
                },
              })}
            />
            {errors.subject && (
              <p className="text-red-500">{errors.subject.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-600">
              Message
            </label>
            <textarea
              id="body"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Enter text of message"
              rows={5}
              {...register("body", {
                required: "Send a message",
              })}
            />
            {errors.body && (
              <p className="text-red-500">{errors.body.message}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Send
            </button>
            <button
              type="button"
              onClick={() => setIsOpenedForm(false)}
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Close form
            </button>
          </div>
          {globalError && <p className="text-red-500">{globalError}</p>}
        </form>
      ) : (
        <button
          onClick={() => setIsOpenedForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
        >
          Send Email
        </button>
      )}

      {isOpenedHistory ? (
        <div className="mt-6 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">History</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Recipient</th>
                <th className="px-4 py-2 text-left">Subject</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">test@test.test</td>
                <td className="px-4 py-2">test subject</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">test@test.test</td>
                <td className="px-4 py-2">test ubject</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex justify-between">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Prev
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Next
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleGetHistoryOfMails}
          className="bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-700"
        >
          Get History
        </button>
      )}
    </div>
  );
};
