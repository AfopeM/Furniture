"use client";
import { BlurImage } from ".";
import { useReducer } from "react";
import { motion } from "framer-motion";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EmailFormProps {
  address: string;
  isValid: undefined | boolean;
  inFocus: boolean;
}

const Initial_State: EmailFormProps = {
  address: "",
  isValid: undefined,
  inFocus: false,
};

const ACTIONS = {
  UPDATE: "update",
  FOCUS: "focus",
  SUBMIT: "submit",
};

type EmailAction = {
  type: string;
  payload?: {
    address?: string;
    focus?: boolean;
  };
};

function emailReducer(state: EmailFormProps, action: EmailAction) {
  switch (action.type) {
    case ACTIONS.UPDATE: {
      const newAddress = action.payload?.address || "";
      return { ...state, address: newAddress };
    }

    case ACTIONS.FOCUS: {
      return {
        ...state,
        isValid: undefined,
        inFocus: action.payload?.focus || false,
      };
    }

    case ACTIONS.SUBMIT: {
      const valid = /^\w+([-\.=%+]*\w)*@\w([\.]?\w)*(\.\w{2,4})$/.test(
        state.address
      );
      return { ...state, isValid: valid };
    }

    default:
      return state;
  }
}

export default function EmailForm() {
  const [state, dispatch] = useReducer(emailReducer, Initial_State);

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch({ type: ACTIONS.SUBMIT });
  }

  return (
    <section className="brand-px">
      <div
        className="relative mx-auto max-w-3xl overflow-hidden 
        rounded-xl bg-brand-dark px-8 py-16 text-center md:px-16"
      >
        <BlurImage
          imgSrc="/hero.webp"
          imgAlt="email bg-image"
          style="z-0 opacity-10"
        />

        <div className="relative z-10 mx-auto max-w-lg">
          {/* EMAIL CALL TO ACTION */}
          <h2
            className=" font-tight pb-2 text-3xl font-medium uppercase 
            md:text-4xl"
          >
            Subscribe to our Newsletter
          </h2>
          <p className="font-fira font-light text-brand-gray">
            Stay up to date with the latest luxury furniture trends, exclusive
            promotions, and new product launches by subscribing to our
            newsletter today.
          </p>

          {/*EMAIL INPUT */}
          {state.isValid ? (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0.5, 1.5, 1],
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 240,
                },
              }}
              className="mt-12 flex h-12 items-center justify-center gap-4"
            >
              <span className="text-4xl">Thank You</span>
              <FontAwesomeIcon
                icon={faCheck}
                className="h-6 w-6 rounded-full border-2 border-solid border-brand-base p-2"
              />
            </motion.div>
          ) : (
            <form
              action=""
              className={`${
                state.inFocus ? "outline" : ""
              } relative mt-6 flex items-center justify-between
              rounded-xl bg-brand-light py-2 pl-4 pr-2 font-fira
              outline-2 outline-offset-4 outline-brand-base`}
            >
              <input
                type="email"
                value={state.address}
                onFocus={() =>
                  dispatch({ type: ACTIONS.FOCUS, payload: { focus: true } })
                }
                onBlur={() =>
                  dispatch({ type: ACTIONS.FOCUS, payload: { focus: false } })
                }
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.UPDATE,
                    payload: { address: e.target.value },
                  })
                }
                className="h-10 w-3/4 bg-transparent text-brand-dark/50 
                focus:outline-none"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="brand-duration-500 rounded-xl 
              bg-brand-base/10 px-6 py-4 text-brand-base 
              hover:bg-brand-base hover:text-brand-light"
              >
                Subscribe
              </button>

              <span
                className={`${
                  state.isValid === undefined
                    ? ""
                    : state.isValid
                    ? ""
                    : "translate-y-10"
                } 
              brand-duration-500 absolute bottom-0 left-1/2 -z-10 w-1/2 
              -translate-x-1/2 rounded-bl-xl rounded-br-xl 
              bg-brand-red/25 py-2 font-bold tracking-wider 
              text-brand-red`}
              >
                Invalid Email
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
