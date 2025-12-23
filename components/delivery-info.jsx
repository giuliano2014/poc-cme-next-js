export default function DeliveryInfo({ deliveryInfo }) {
    if (!deliveryInfo) return null;

    const {
        background_color,
        button,
        main_text,
        secondary_text,
        separator_color,
        text_color
    } = deliveryInfo;

    return (
        <div
            className="w-full py-8 px-4"
            style={{ backgroundColor: background_color }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center justify-center gap-4">
                    {/* Main text */}
                    <div className="text-center" style={{ color: text_color }}>
                        <div
                            className="text-lg md:text-xl font-bold"
                            dangerouslySetInnerHTML={{ __html: main_text }}
                        />
                        <div
                            className="text-sm md:text-base mt-2"
                            dangerouslySetInnerHTML={{ __html: secondary_text }}
                        />
                    </div>

                    {/* Button */}
                    {button && (
                        <a
                            href={button.link}
                            className="px-6 py-3 rounded-full font-semibold transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: button.background_color,
                                color: button.textColor
                            }}
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: button.text
                                }}
                            />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
