import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

const config: PostedConfig = {
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
};

export default function StartCall() {
    const { status, connect } = useVoice({ config_id: "e2c38ac3-e8bc-4a6f-818d-d86e6d924a91" });

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
                                        .then(() => {
                                            // Handle successful connection
                                        })
                                        .catch((error) => {
                                            console.error("Connection error:", error);
                                        })
                                        .finally(() => {
                                            // Any cleanup or final actions
                                        });
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
