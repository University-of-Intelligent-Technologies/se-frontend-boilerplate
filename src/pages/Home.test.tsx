/// <reference types="@testing-library/jest-dom/vitest" />
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { beforeEach, describe, expect, it } from "vitest";
import translationEN from "../assets/locales/en/translations.json";
import translationES from "../assets/locales/es/translations.json";
import { Home } from "./Home";

// a separate i18next instance with the translations in memory: no network, no language detector
const i18n = createInstance();

beforeEach(async () => {
	await i18n.use(initReactI18next).init({
		lng: "en",
		defaultNS: "translations",
		resources: {
			en: { translations: translationEN },
			es: { translations: translationES },
		},
	});
});

describe("Home", () => {
	it("greets in English and switches to Spanish", async () => {
		render(
			<I18nextProvider i18n={i18n}>
				<Home />
			</I18nextProvider>
		);

		expect(screen.getByText("Hello, world!")).toBeInTheDocument();

		await userEvent.click(screen.getByRole("button", { name: "translate" }));

		expect(await screen.findByText("¡Hola, Mundo!")).toBeInTheDocument();
	});
});
