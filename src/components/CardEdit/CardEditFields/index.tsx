import { useState } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import Showdown from "showdown";
import Input from "../../Input";
import * as S from "./styles";

interface Props {
  cardData: CardData | undefined;
  onSaveCardData: (cardData: CardData) => void;
}

export default function CardEditFields({ cardData, onSaveCardData }: Props) {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const converter = new Showdown.Converter();

  const handleNameChange = (value: string) => {
    cardData && onSaveCardData({ ...cardData, name: value });
  };

  const handleTraitsChange = (value: string) => {
    cardData && onSaveCardData({ ...cardData, traits: value });
  };

  const handleActionsChange = (value: string) => {
    cardData && onSaveCardData({ ...cardData, actions: value });
  };

  const handleTypeChange = (value: string) => {
    cardData && onSaveCardData({ ...cardData, type: value });
  };

  const handleLevelChange = (value: string) => {
    cardData && onSaveCardData({ ...cardData, level: value });
  };

  return (
    <S.CardEdit>
      <Input
        label="Nom:"
        value={cardData?.name ?? ""}
        onChange={handleNameChange}
      />
      <Input
        label="Traits:"
        value={cardData?.traits ?? ""}
        onChange={handleTraitsChange}
      />
      <Input
        label="Actions:"
        value={cardData?.actions ?? ""}
        onChange={handleActionsChange}
      />
      <div style={{ marginTop: "10px" }}>
        <label style={{ color: "#5d0000", fontWeight: "bold" }}>Type:</label>
        <S.StyledSelect
          value={cardData?.type ?? ""}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="">-- Choisir un type --</option>
          <option value="Cantrip">Cantrip</option>
          <option value="Créature">Créature</option>
          <option value="Don">Don</option>
          <option value="Objet">Objet</option>
          <option value="Sort">Sort</option>
        </S.StyledSelect>
      </div>
      <Input
        label="Niveau:"
        value={cardData?.level.toString() ?? ""}
        onChange={handleLevelChange}
      />
      <div style={{ marginTop: 10 }}>
        <label style={{ color: "#5d0000", fontWeight: "bold" }}>
          Corps de la carte:
        </label>
        <ReactMde
          value={cardData?.body ?? ""}
          onChange={(value) =>
            cardData && onSaveCardData({ ...cardData, body: value })
          }
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          childProps={{
            writeButton: { tabIndex: -1 },
          }}
        />
      </div>
    </S.CardEdit>
  );
}
