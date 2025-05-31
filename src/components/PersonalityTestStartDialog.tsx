import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonalityTestStartDialogProps {
  open: boolean;
  onClose: () => void;
  onStart: (name: string, language: string) => void;
}

const languages = {
  en: "English",
  es: "Español",
  hi: "हिन्दी",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  ar: "العربية",
};

export function PersonalityTestStartDialog({
  open,
  onClose,
  onStart,
}: PersonalityTestStartDialogProps) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [language, setLanguage] = useState(i18n.language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim(), language);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("testStart.title")}</DialogTitle>
          <DialogDescription>{t("testStart.description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t("testStart.nameLabel")}
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("testStart.namePlaceholder")}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="language" className="text-sm font-medium">
              {t("testStart.languageLabel")}
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder={t("testStart.languagePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-light to-neuro-primary hover:from-neuro-primary hover:to-primary-light text-white"
          >
            {t("testStart.startButton")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}