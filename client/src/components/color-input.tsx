import { Colors } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface ColorInputProps {
    value?: string
    onChange: (value: string) => void
}

function ColorInput({ value, onChange }: ColorInputProps) {
    return (
        <div className="grid grid-cols-8 gap-1">
            {Colors.map((color) => (
                <div
                    key={color}
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => onChange(color)}
                >
                    <div
                        className={cn(
                            `w-6 h-6 rounded-xs`,
                            color === value && "ring-2 ring-ring"
                        )}
                        style={{ backgroundColor: color }}
                    />
                </div>
            ))}
        </div>
    )
}

export default ColorInput