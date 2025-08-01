"use client";

import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { z } from "zod";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { log } from "console";

const schema = z.object({
  name: z.string().min(3, "name must be atleast 3 character long"),
  amount: z
    .number("Amount must be a number")
    .positive("Amount must be greater than 0"),
});

const CreateNewBudget = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState("👚");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setname] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({});
  const modalRef = useRef<HTMLDivElement>(null);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
      setOpenEmojiPicker(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse({
      name,
      amount: Number(amount),
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        amount: fieldErrors.amount?.[0],
      });
      return;
    }
    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ emoji, name, amount, createdBy: userId }),
    });
    const resData = await res.json();
    if (res.ok && resData.success) {
      // If successful
      setErrors({});
      setOpen(false);
      toast.success(resData?.message);
    } else {
      toast.error(resData?.message || "something went wrong");
    }
  };

  return (
    <div>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className="bg-neutral-900/70 border-dashed border-2 cursor-pointer border-neutral-700 p-10 flex items-center justify-center flex-col text-neutral-500 hover:bg-neutral-800/70"
      >
        <h1>+</h1>
        <h2>Create New Budget</h2>
      </div>

      {/* Modal */}
      {open && (
        <div
          onClick={onBackdropClick}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
        >
          <div
            ref={modalRef}
            className="bg-neutral-900 z-50 border border-neutral-800 py-4 px-6 w-full max-w-md shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-neutral-200">Add Budget</h2>
              <button
                onClick={() => {
                  setOpen(false);
                  setOpenEmojiPicker(false);
                }}
                className="text-2xl text-gray-400 hover:text-gray-200"
              >
                <IoMdClose />
              </button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-neutral-400">
                  pick a emoji for budget
                </label>
                <button
                  type="button"
                  className="p-2 bg-neutral-800 border border-neutral-700 text-6xl"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emoji}
                </button>
              </div>

              {openEmojiPicker && (
                <div>
                  <EmojiPicker
                    theme={Theme.DARK}
                    emojiStyle={EmojiStyle.NATIVE}
                    onEmojiClick={(emojiData) => {
                      setEmoji(emojiData.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-neutral-400">name</label>
                <input
                  type="name"
                  placeholder="eg: fast food"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="border border-neutral-700 bg-neutral-800 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-neutral-400">amount</label>
                <input
                  type="number"
                  placeholder="eg: 2000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border border-neutral-700 bg-neutral-800 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>

              {/* Error messages */}
              {(errors.name || errors.amount) && (
                <div className="text-red-500 text-sm flex flex-col gap-1 mt-2">
                  {errors.name && <span>{errors.name}</span>}
                  {errors.amount && <span>{errors.amount}</span>}
                </div>
              )}

              <button
                type="submit"
                className="bg-green-800 mt-2 text-white py-2 hover:bg-green-700 cursor-pointer transition"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewBudget;
