import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import * as Hume from "../../../../../../index";
import 

      {
          name: "EVI 2 config",
          prompt: {
              id: "e2c38ac3-e8bc-4a6f-818d-d86e6d924a91",
              version: 0
          },
          eviVersion: "2",
          voice: {
              provider: "HUME_AI",
              name: "ANNA"
          },
          languageModel: {
              modelProvider: Hume.empathicVoice.PostedLanguageModelModelProvider.Anthropic,
              modelResource: "claude-3-5-sonnet-20240620",
              temperature: 1
          },
          eventMessages: {
              onNewChat: {
                  enabled: false,
                  text: ""
              },
              onInactivityTimeout: {
                  enabled: false,
                  text: ""
             },
              onMaxDurationTimeout: {
                  enabled: false,
                  text: ""
              }
          }
      }
export interface PostedConfig {
    /** Specifies the EVI version to use. Use `"1"` for version 1, or `"2"` for the latest enhanced version. For a detailed comparison of the two versions, refer to our [guide](/docs/empathic-voice-interface-evi/evi-2). */
    eviVersion: string;
    /** Name applied to all versions of a particular Config. */
    name: string;
    /** An optional description of the Config version. */
    versionDescription?: string;
    prompt?: Hume.empathicVoice.PostedConfigPromptSpec;
    /** A voice specification associated with this Config. */
    voice?: Hume.empathicVoice.PostedVoice;
    /**
     * The supplemental language model associated with this Config.
     *
     * This model is used to generate longer, more detailed responses from EVI. Choosing an appropriate supplemental language model for your use case is crucial for generating fast, high-quality responses from EVI.
     */
    languageModel?: Hume.empathicVoice.PostedLanguageModel;
    /**
     * The eLLM setup associated with this Config.
     *
     * Hume's eLLM (empathic Large Language Model) is a multimodal language model that takes into account both expression measures and language. The eLLM generates short, empathic language responses and guides text-to-speech (TTS) prosody.
     */
    ellmModel?: Hume.empathicVoice.PostedEllmModel;
    /** List of user-defined tools associated with this Config. */
    tools?: (Hume.empathicVoice.PostedUserDefinedToolSpec | undefined)[];
    /** List of built-in tools associated with this Config. */
    builtinTools?: (Hume.empathicVoice.PostedBuiltinTool | undefined)[];
    eventMessages?: Hume.empathicVoice.PostedEventMessageSpecs;
    timeouts?: Hume.empathicVoice.PostedTimeoutSpecs;
}
export default function StartCall() {
  const { status, connect } = useVoice(config_id="e2c38ac3-e8bc-4a6f-818d-d86e6d924a91");

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={"fixed inset-0 p-4 flex items-center justify-center bg-background"}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <Button
                className={"z-50 flex items-center gap-1.5"}
                onClick={() => {
                  connect()
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {});
                }}
              >
                <span>
                  <Phone
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"currentColor"}
                  />
                </span>
                <span>Start Call</span>
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
