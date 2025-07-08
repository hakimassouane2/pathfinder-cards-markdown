import { useState } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import type { ActionMeta, MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import Showdown from "showdown";
import Input from "../../Input";
import * as S from "./styles";

interface Props {
  cardData: CardData | undefined;
  onSaveCardData: (cardData: CardData) => void;
}

const TRAIT_OPTIONS = [
  { value: "Aberration", label: "Aberration" },
  { value: "Aboutissement", label: "Aboutissement" },
  { value: "Acide", label: "Acide" },
  { value: "Additif", label: "Additif" },
  { value: "Aéon", label: "Aéon" },
  { value: "Aesir", label: "Aesir" },
  { value: "Agathion", label: "Agathion" },
  { value: "Agent", label: "Agent" },
  { value: "Agile", label: "Agile" },
  { value: "Air", label: "Air" },
  { value: "Aiuvarin", label: "Aiuvarin" },
  { value: "Ajusté", label: "Ajusté" },
  { value: "Ajustement", label: "Ajustement" },
  { value: "Alchimique", label: "Alchimique" },
  { value: "Alchimiste", label: "Alchimiste" },
  { value: "Alimenté", label: "Alimenté" },
  { value: "Allonge", label: "Allonge" },
  { value: "Âme liée", label: "Âme liée" },
  { value: "Âme-en-peine", label: "Âme-en-peine" },
  { value: "Amélioration", label: "Amélioration" },
  { value: "Amphibie", label: "Amphibie" },
  { value: "Ampli", label: "Ampli" },
  { value: "Amplification 1", label: "Amplification 1" },
  { value: "Amplification 1d4", label: "Amplification 1d4" },
  { value: "Anadi", label: "Anadi" },
  { value: "Analogue", label: "Analogue" },
  { value: "Ancrage", label: "Ancrage" },
  { value: "Androïde", label: "Androïde" },
  { value: "Ange", label: "Ange" },
  { value: "Animal", label: "Animal" },
  { value: "Animal éveillé", label: "Animal éveillé" },
  { value: "Animanthrope", label: "Animanthrope" },
  { value: "Animiste", label: "Animiste" },
  { value: "Aphorite", label: "Aphorite" },
  { value: "Apogée", label: "Apogée" },
  { value: "Apparition", label: "Apparition" },
  { value: "Appel", label: "Appel" },
  { value: "Aquatique", label: "Aquatique" },
  { value: "Arcanique", label: "Arcanique" },
  { value: "Archaïque", label: "Archaïque" },
  { value: "Archétype", label: "Archétype" },
  { value: "Archon", label: "Archon" },
  { value: "Arcs", label: "Arcs" },
  { value: "Ardande", label: "Ardande" },
  { value: "Artefact", label: "Artefact" },
  { value: "Astral", label: "Astral" },
  { value: "Astrazoan", label: "Astrazoan" },
  { value: "Athamaru", label: "Athamaru" },
  { value: "Attaché", label: "Attaché" },
  { value: "Attaque", label: "Attaque" },
  { value: "Audible", label: "Audible" },
  { value: "Aura", label: "Aura" },
  { value: "Automate", label: "Automate" },
  { value: "Automatique", label: "Automatique" },
  { value: "Azarketi", label: "Azarketi" },
  { value: "Azata", label: "Azata" },
  { value: "Baguette", label: "Baguette" },
  { value: "Balayage", label: "Balayage" },
  { value: "Barathu", label: "Barathu" },
  { value: "Barbare", label: "Barbare" },
  { value: "Barde", label: "Barde" },
  { value: "Bardes", label: "Bardes" },
  { value: "Bâton", label: "Bâton" },
  { value: "Bête", label: "Bête" },
  { value: "Biotech", label: "Biotech" },
  { value: "Blessure", label: "Blessure" },
  { value: "Bois", label: "Bois" },
  { value: "Bombe", label: "Bombe" },
  { value: "Boost 1d10", label: "Boost 1d10" },
  { value: "Borai", label: "Borai" },
  { value: "Bourbiérin", label: "Bourbiérin" },
  { value: "Bravade", label: "Bravade" },
  { value: "Bretteur", label: "Bretteur" },
  { value: "Bricolé", label: "Bricolé" },
  { value: "Brutal", label: "Brutal" },
  { value: "Bruyante", label: "Bruyante" },
  { value: "Caligni", label: "Caligni" },
  { value: "Canon double", label: "Canon double" },
  { value: "Capacité", label: "Capacité" },
  { value: "Catalyseur", label: "Catalyseur" },
  { value: "Céleste", label: "Céleste" },
  { value: "Centaure", label: "Centaure" },
  { value: "Céramique", label: "Céramique" },
  { value: "Champignon", label: "Champignon" },
  { value: "Champion", label: "Champion" },
  { value: "Changelin", label: "Changelin" },
  { value: "Chasse sauvage", label: "Chasse sauvage" },
  { value: "Coagulant", label: "Coagulant" },
  { value: "Coda", label: "Coda" },
  { value: "Cœur de sort", label: "Cœur de sort" },
  { value: "Combiné", label: "Combiné" },
  { value: "Commotion", label: "Commotion" },
  { value: "Compact", label: "Compact" },
  { value: "Compagnon", label: "Compagnon" },
  { value: "Compétence", label: "Compétence" },
  { value: "Complexe", label: "Complexe" },
  { value: "Composite", label: "Composite" },
  { value: "Composition", label: "Composition" },
  { value: "Concentration", label: "Concentration" },
  { value: "Configurable C, P ou T", label: "Configurable C, P ou T" },
  { value: "Confort", label: "Confort" },
  { value: "Conjurateur", label: "Conjurateur" },
  { value: "Conrasu", label: "Conrasu" },
  { value: "Consécration", label: "Consécration" },
  { value: "Consommable", label: "Consommable" },
  { value: "Consommation 1", label: "Consommation 1" },
  { value: "Consommation 10", label: "Consommation 10" },
  { value: "Consommation 2", label: "Consommation 2" },
  { value: "Consommation 5", label: "Consommation 5" },
  { value: "Contact", label: "Contact" },
  { value: "Contemplative", label: "Contemplative" },
  { value: "Contingence", label: "Contingence" },
  { value: "Contrat", label: "Contrat" },
  { value: "Convocation", label: "Convocation" },
  { value: "Convoqué", label: "Convoqué" },
  { value: "Cosmique", label: "Cosmique" },
  { value: "Courant", label: "Courant" },
  { value: "Créature artificielle", label: "Créature artificielle" },
  { value: "Crépusculaire", label: "Crépusculaire" },
  { value: "Critique (Corrosif)", label: "Critique (Corrosif)" },
  { value: "Critique (Couteau)", label: "Critique (Couteau)" },
  { value: "Critique (Cryo)", label: "Critique (Cryo)" },
  { value: "Critique (Électrocution)", label: "Critique (Électrocution)" },
  { value: "Critique (Flammes)", label: "Critique (Flammes)" },
  { value: "Critique (Mental)", label: "Critique (Mental)" },
  { value: "Critique (Plasma)", label: "Critique (Plasma)" },
  { value: "Critique (Pugilat)", label: "Critique (Pugilat)" },
  { value: "Critique (Sonique)", label: "Critique (Sonique)" },
  { value: "Critique fusionné", label: "Critique fusionné" },
  { value: "Croc-en-jambe", label: "Croc-en-jambe" },
  { value: "Croc-en-jambe à distance", label: "Croc-en-jambe à distance" },
  { value: "Cycle", label: "Cycle" },
  { value: "Daémon", label: "Daémon" },
  { value: "Darvakka", label: "Darvakka" },
  { value: "Débordement", label: "Débordement" },
  { value: "Déchirant", label: "Déchirant" },
  { value: "Démolition", label: "Démolition" },
  { value: "Démon", label: "Démon" },
  { value: "Démontable", label: "Démontable" },
  { value: "Dénué d'intelligence", label: "Dénué d'intelligence" },
  { value: "Déplacement", label: "Déplacement" },
  { value: "Déployable", label: "Déployable" },
  { value: "Dero", label: "Dero" },
  { value: "Désarmer", label: "Désarmer" },
  { value: "Descendant de génie", label: "Descendant de génie" },
  { value: "Destinée", label: "Destinée" },
  { value: "Détection", label: "Détection" },
  { value: "Deux-mains", label: "Deux-mains" },
  { value: "Déviant", label: "Déviant" },
  { value: "Dévouement", label: "Dévouement" },
  { value: "Dhampir", label: "Dhampir" },
  { value: "Diable", label: "Diable" },
  { value: "Dinosaure", label: "Dinosaure" },
  { value: "Directive", label: "Directive" },
  { value: "Discordance", label: "Discordance" },
  { value: "Dispersion", label: "Dispersion" },
  { value: "Dissimulable", label: "Dissimulable" },
  { value: "Distordu", label: "Distordu" },
  { value: "Divin", label: "Divin" },
  { value: "Dragon", label: "Dragon" },
  { value: "Dragonkin", label: "Dragonkin" },
  { value: "Dressage", label: "Dressage" },
  { value: "Drift", label: "Drift" },
  { value: "Drogue", label: "Drogue" },
  { value: "Dromaar", label: "Dromaar" },
  { value: "Druide", label: "Druide" },
  { value: "Eau", label: "Eau" },
  { value: "Éclaboussure", label: "Éclaboussure" },
  { value: "Éclaboussure (3m)", label: "Éclaboussure (3m)" },
  { value: "Eidolon", label: "Eidolon" },
  { value: "Élaboré", label: "Élaboré" },
  { value: "Électricité", label: "Électricité" },
  { value: "Élémentaire", label: "Élémentaire" },
  { value: "Elfe", label: "Elfe" },
  { value: "Élixir", label: "Élixir" },
  { value: "Émissaire", label: "Émissaire" },
  { value: "Émotion", label: "Émotion" },
  { value: "En résonance", label: "En résonance" },
  { value: "Encensoir", label: "Encensoir" },
  { value: "Encombrante", label: "Encombrante" },
  { value: "Enquêteur", label: "Enquêteur" },
  { value: "Ensorceleur", label: "Ensorceleur" },
  { value: "Errant", label: "Errant" },
  { value: "Escalade", label: "Escalade" },
  { value: "Ésotérique", label: "Ésotérique" },
  { value: "Éthéré", label: "Éthéré" },
  { value: "Évolution", label: "Évolution" },
  { value: "Exalté", label: "Exalté" },
  { value: "Expansible", label: "Expansible" },
  { value: "Expérimental", label: "Expérimental" },
  { value: "Exploration", label: "Exploration" },
  { value: "Exposé", label: "Exposé" },
  { value: "Extradimensionnel", label: "Extradimensionnel" },
  { value: "Fantôme", label: "Fantôme" },
  { value: "Fatal", label: "Fatal" },
  { value: "Fée", label: "Fée" },
  { value: "Félide", label: "Félide" },
  { value: "Fetchelin", label: "Fetchelin" },
  { value: "Feu", label: "Feu" },
  { value: "Fiélon", label: "Fiélon" },
  { value: "Figure de proue", label: "Figure de proue" },
  { value: "Finesse", label: "Finesse" },
  { value: "Fini", label: "Fini" },
  { value: "Focalisation", label: "Focalisation" },
  { value: "Focalisé", label: "Focalisé" },
  { value: "Force", label: "Force" },
  { value: "Fortune", label: "Fortune" },
  { value: "Franc-tireur", label: "Franc-tireur" },
  { value: "Froid", label: "Froid" },
  { value: "Fùlù", label: "Fùlù" },
  { value: "Gadget", label: "Gadget" },
  { value: "Ganzi", label: "Ganzi" },
  { value: "Garou", label: "Garou" },
  { value: "Géant", label: "Géant" },
  { value: "Gênant", label: "Gênant" },
  { value: "Général", label: "Général" },
  { value: "Génie", label: "Génie" },
  { value: "Ghoran", label: "Ghoran" },
  { value: "Ghul", label: "Ghul" },
  { value: "Gnome", label: "Gnome" },
  { value: "Gobelin", label: "Gobelin" },
  { value: "Gobelours", label: "Gobelours" },
  { value: "Goloma", label: "Goloma" },
  { value: "Goule", label: "Goule" },
  { value: "Gravité", label: "Gravité" },
  { value: "Greffe", label: "Greffe" },
  { value: "Gremlin", label: "Gremlin" },
  { value: "Grenade", label: "Grenade" },
  { value: "Grimoire", label: "Grimoire" },
  { value: "Guenaude", label: "Guenaude" },
  { value: "Guérison", label: "Guérison" },
  { value: "Guerrier", label: "Guerrier" },
  { value: "Guidage", label: "Guidage" },
  { value: "Guidage +1", label: "Guidage +1" },
  { value: "Guidage +2", label: "Guidage +2" },
  { value: "Guidage +3", label: "Guidage +3" },
  { value: "Halfelin", label: "Halfelin" },
  { value: "Hantise", label: "Hantise" },
  { value: "Hobgobelin", label: "Hobgobelin" },
  { value: "Homme-lézard", label: "Homme-lézard" },
  { value: "Homme-poisson", label: "Homme-poisson" },
  { value: "Homme-rat", label: "Homme-rat" },
  { value: "Homme-serpent", label: "Homme-serpent" },
  { value: "Hryngar", label: "Hryngar" },
  { value: "Huile", label: "Huile" },
  { value: "Humain", label: "Humain" },
  { value: "Humanoïde", label: "Humanoïde" },
  { value: "Hydrodynamique", label: "Hydrodynamique" },
  { value: "Ifrit", label: "Ifrit" },
  { value: "Ikône", label: "Ikône" },
  { value: "Illusion", label: "Illusion" },
  { value: "Impie", label: "Impie" },
  { value: "Imprégné", label: "Imprégné" },
  { value: "Imprudent", label: "Imprudent" },
  { value: "Impulsion", label: "Impulsion" },
  { value: "Incantateur", label: "Incantateur" },
  { value: "Incarnation", label: "Incarnation" },
  { value: "Infortune", label: "Infortune" },
  { value: "Ingéré", label: "Ingéré" },
  { value: "Inhalé", label: "Inhalé" },
  { value: "Injection", label: "Injection" },
  { value: "Inscriptible", label: "Inscriptible" },
  { value: "Instable", label: "Instable" },
  { value: "Intangible", label: "Intangible" },
  { value: "Intégré", label: "Intégré" },
  { value: "Intelligent", label: "Intelligent" },
  { value: "Intermède", label: "Intermède" },
  { value: "Inventeur", label: "Inventeur" },
  { value: "Investi", label: "Investi" },
  { value: "Jet", label: "Jet" },
  { value: "Jinsul", label: "Jinsul" },
  { value: "Joute", label: "Joute" },
  { value: "Jumelle", label: "Jumelle" },
  { value: "Kalo", label: "Kalo" },
  { value: "Kasatha", label: "Kasatha" },
  { value: "Kashrishi", label: "Kashrishi" },
  { value: "Kholo", label: "Kholo" },
  { value: "Kinétiste", label: "Kinétiste" },
  { value: "Kitsune", label: "Kitsune" },
  { value: "Kobold", label: "Kobold" },
  { value: "Kothama", label: "Kothama" },
  { value: "Kucharn", label: "Kucharn" },
  { value: "Laminaire", label: "Laminaire" },
  { value: "Lancesort", label: "Lancesort" },
  { value: "Lanceur", label: "Lanceur" },
  { value: "Lashunta", label: "Lashunta" },
  { value: "Léchi", label: "Léchi" },
  { value: "Lié à une malédiction", label: "Lié à une malédiction" },
  { value: "Lignée", label: "Lignée" },
  { value: "Linguistique", label: "Linguistique" },
  { value: "Litanie", label: "Litanie" },
  { value: "Lumière", label: "Lumière" },
  { value: "Magicien", label: "Magicien" },
  { value: "Magique", label: "Magique" },
  { value: "Magus", label: "Magus" },
  { value: "Main-libre", label: "Main-libre" },
  { value: "Mains nues", label: "Mains nues" },
  { value: "Maladie", label: "Maladie" },
  { value: "Malédiction", label: "Malédiction" },
  { value: "Maléfice", label: "Maléfice" },
  { value: "Manifestation", label: "Manifestation" },
  { value: "Manipulation", label: "Manipulation" },
  { value: "Maudit", label: "Maudit" },
  { value: "Mécanique", label: "Mécanique" },
  { value: "Mécanisme", label: "Mécanisme" },
  { value: "Mécano", label: "Mécano" },
  { value: "Mental", label: "Mental" },
  { value: "Mentalisation", label: "Mentalisation" },
  { value: "Métal", label: "Métal" },
  { value: "Métamorphose", label: "Métamorphose" },
  { value: "Minotaure", label: "Minotaure" },
  { value: "Mise hors de combat", label: "Mise hors de combat" },
  { value: "Missile", label: "Missile" },
  { value: "Missive", label: "Missive" },
  { value: "Modification", label: "Modification" },
  {
    value: "Modulaire (Arcs ou non-léthal)",
    label: "Modulaire (Arcs ou non-léthal)",
  },
  { value: "Modulaire (C ou F)", label: "Modulaire (C ou F)" },
  { value: "Modulaire (C ou vide)", label: "Modulaire (C ou vide)" },
  { value: "Modulaire (S ou vide)", label: "Modulaire (S ou vide)" },
  { value: "Moine", label: "Moine" },
  { value: "Momie", label: "Momie" },
  { value: "Monté", label: "Monté" },
  { value: "Mort", label: "Mort" },
  { value: "Mort définitive", label: "Mort définitive" },
  { value: "Mort-vivant", label: "Mort-vivant" },
  { value: "Mortel", label: "Mortel" },
  { value: "Multiclasse", label: "Multiclasse" },
  { value: "Multimodal", label: "Multimodal" },
  { value: "Multiversaliste", label: "Multiversaliste" },
  { value: "Mutagène", label: "Mutagène" },
  { value: "Mutamagie", label: "Mutamagie" },
  { value: "Mutant", label: "Mutant" },
  { value: "Mystique", label: "Mystique" },
  { value: "Mythique", label: "Mythique" },
  { value: "Nagaji", label: "Nagaji" },
  { value: "Nain", label: "Nain" },
  { value: "Nanite", label: "Nanite" },
  { value: "Nécrophage", label: "Nécrophage" },
  { value: "Néphilim", label: "Néphilim" },
  { value: "Nindoru", label: "Nindoru" },
  { value: "Nom véritable", label: "Nom véritable" },
  { value: "Non-létal", label: "Non-létal" },
  { value: "Nuée", label: "Nuée" },
  { value: "Nymphe", label: "Nymphe" },
  { value: "Occulte", label: "Occulte" },
  { value: "Olfactif", label: "Olfactif" },
  { value: "Ombre", label: "Ombre" },
  { value: "Ombreux", label: "Ombreux" },
  { value: "Ondin", label: "Ondin" },
  { value: "Oni", label: "Oni" },
  { value: "Oracle", label: "Oracle" },
  { value: "Oréade", label: "Oréade" },
  { value: "Orque", label: "Orque" },
  { value: "Pahtra", label: "Pahtra" },
  { value: "Palinthanos", label: "Palinthanos" },
  { value: "Parade", label: "Parade" },
  { value: "Parchemin", label: "Parchemin" },
  { value: "Pastille", label: "Pastille" },
  { value: "Pensée", label: "Pensée" },
  { value: "Percutant", label: "Percutant" },
  { value: "Perfusion", label: "Perfusion" },
  { value: "Persévérer", label: "Persévérer" },
  {
    value: "Personnage : l'électron libre",
    label: "Personnage : l'électron libre",
  },
  { value: "Personnage : l'érudit", label: "Personnage : l'érudit" },
  { value: "Personnage : le chef", label: "Personnage : le chef" },
  { value: "Personnage : le combattant", label: "Personnage : le combattant" },
  { value: "Personnage : le dragueur", label: "Personnage : le dragueur" },
  { value: "Personnage : le gardien", label: "Personnage : le gardien" },
  { value: "Personnage : le perdant", label: "Personnage : le perdant" },
  { value: "Personnage : le scélérat", label: "Personnage : le scélérat" },
  { value: "Pesante", label: "Pesante" },
  { value: "Pestilence", label: "Pestilence" },
  { value: "Peu courant", label: "Peu courant" },
  { value: "Peu maniable", label: "Peu maniable" },
  { value: "Piège", label: "Piège" },
  { value: "Piège artisanal", label: "Piège artisanal" },
  { value: "Plante", label: "Plante" },
  { value: "Poison", label: "Poison" },
  { value: "Polymère", label: "Polymère" },
  { value: "Polyvalent", label: "Polyvalent" },
  { value: "Portable", label: "Portable" },
  { value: "Portée", label: "Portée" },
  { value: "Possession", label: "Possession" },
  { value: "Posture", label: "Posture" },
  { value: "Potion", label: "Potion" },
  { value: "Poupée", label: "Poupée" },
  { value: "Poussée à distance", label: "Poussée à distance" },
  { value: "Pousser", label: "Pousser" },
  { value: "Précieux", label: "Précieux" },
  { value: "Prédiction", label: "Prédiction" },
  { value: "Préparation", label: "Préparation" },
  { value: "Prêtre", label: "Prêtre" },
  { value: "Primordial", label: "Primordial" },
  { value: "Prise d'élan", label: "Prise d'élan" },
  { value: "Prismeni", label: "Prismeni" },
  { value: "Professionnel (Artisanat)", label: "Professionnel (Artisanat)" },
  { value: "Professionnel (Duperie)", label: "Professionnel (Duperie)" },
  {
    value: "Professionnel (Informatique)",
    label: "Professionnel (Informatique)",
  },
  {
    value: "Professionnel (Représentation)",
    label: "Professionnel (Représentation)",
  },
  { value: "Propulsif", label: "Propulsif" },
  { value: "Protéen", label: "Protéen" },
  { value: "Psychée", label: "Psychée" },
  { value: "Psychiste", label: "Psychiste" },
  { value: "Psychopompe", label: "Psychopompe" },
  { value: "Qlippoth", label: "Qlippoth" },
  { value: "Radiation", label: "Radiation" },
  { value: "Rage", label: "Rage" },
  { value: "Rakshasa", label: "Rakshasa" },
  { value: "Rappel", label: "Rappel" },
  { value: "Rare", label: "Rare" },
  { value: "Rechargement", label: "Rechargement" },
  { value: "Recul", label: "Recul" },
  { value: "Récupération", label: "Récupération" },
  { value: "Reflet", label: "Reflet" },
  { value: "Réincarné", label: "Réincarné" },
  { value: "Relique", label: "Relique" },
  { value: "Rempart", label: "Rempart" },
  { value: "Renfort", label: "Renfort" },
  { value: "Répercussion", label: "Répercussion" },
  { value: "Répétition", label: "Répétition" },
  { value: "Résonant", label: "Résonant" },
  { value: "Rétractable", label: "Rétractable" },
  { value: "Révélation", label: "Révélation" },
  { value: "Robot", label: "Robot" },
  { value: "Rôdeur", label: "Rôdeur" },
  { value: "Roublard", label: "Roublard" },
  { value: "Sage-femme", label: "Sage-femme" },
  { value: "Saggorak", label: "Saggorak" },
  { value: "Saint", label: "Saint" },
  { value: "Saisir", label: "Saisir" },
  { value: "Sanctifié", label: "Sanctifié" },
  { value: "Sang-dragon", label: "Sang-dragon" },
  { value: "Sarcesian", label: "Sarcesian" },
  { value: "Sbire", label: "Sbire" },
  { value: "Scrutation", label: "Scrutation" },
  { value: "Secret", label: "Secret" },
  { value: "Secteur", label: "Secteur" },
  { value: "Sedacthy", label: "Sedacthy" },
  { value: "Serment", label: "Serment" },
  { value: "Sérum", label: "Sérum" },
  { value: "Shirren", label: "Shirren" },
  { value: "Shisk", label: "Shisk" },
  { value: "Shouni", label: "Shouni" },
  { value: "Skittermander", label: "Skittermander" },
  { value: "Social", label: "Social" },
  { value: "Solarien", label: "Solarien" },
  { value: "Soldat", label: "Soldat" },
  { value: "Sommeil", label: "Sommeil" },
  { value: "Son", label: "Son" },
  { value: "Sophistication", label: "Sophistication" },
  { value: "Sorcier", label: "Sorcier" },
  { value: "Souffle en bouteille", label: "Souffle en bouteille" },
  { value: "Souple", label: "Souple" },
  { value: "Spirituel", label: "Spirituel" },
  { value: "Sprite", label: "Sprite" },
  { value: "Squelette", label: "Squelette" },
  { value: "Strix", label: "Strix" },
  { value: "Structure", label: "Structure" },
  { value: "Subtil", label: "Subtil" },
  { value: "Suli", label: "Suli" },
  { value: "Surki", label: "Surki" },
  { value: "Sylphe", label: "Sylphe" },
  { value: "Talisman", label: "Talisman" },
  { value: "Talos", label: "Talos" },
  { value: "Tandem", label: "Tandem" },
  { value: "Tane", label: "Tane" },
  { value: "Tatouage", label: "Tatouage" },
  { value: "Tea", label: "Tea" },
  { value: "Techno", label: "Techno" },
  { value: "Technomagique", label: "Technomagique" },
  { value: "Technomancien", label: "Technomancien" },
  { value: "Télépathie", label: "Télépathie" },
  { value: "Téléportation", label: "Téléportation" },
  { value: "Ténèbres", label: "Ténèbres" },
  { value: "Tengu", label: "Tengu" },
  { value: "Terre", label: "Terre" },
  { value: "Terreur", label: "Terreur" },
  { value: "Thaumaturge", label: "Thaumaturge" },
  { value: "Tour de magie", label: "Tour de magie" },
  { value: "Traître", label: "Traître" },
  { value: "Transcendance", label: "Transcendance" },
  { value: "Transfert", label: "Transfert" },
  { value: "Transformation", label: "Transformation" },
  { value: "Tripkee", label: "Tripkee" },
  { value: "Troll", label: "Troll" },
  { value: "Unique", label: "Unique" },
  { value: "Vampire", label: "Vampire" },
  { value: "Vanara", label: "Vanara" },
  { value: "Vapeur", label: "Vapeur" },
  { value: "Vase", label: "Vase" },
  { value: "Véhiculaire", label: "Véhiculaire" },
  { value: "Veilleur", label: "Veilleur" },
  { value: "Venimeux", label: "Venimeux" },
  { value: "Vesk", label: "Vesk" },
  { value: "Vide", label: "Vide" },
  { value: "Virtuel", label: "Virtuel" },
  { value: "Virulent", label: "Virulent" },
  { value: "Visée fatale", label: "Visée fatale" },
  { value: "Vishkanya", label: "Vishkanya" },
  { value: "Visuel", label: "Visuel" },
  { value: "Vitalité", label: "Vitalité" },
  { value: "Vlaka", label: "Vlaka" },
  { value: "Volée", label: "Volée" },
  { value: "Xulgath", label: "Xulgath" },
  { value: "Zombi", label: "Zombi" },
  { value: "Zone", label: "Zone" },
  { value: "Zone (Cône)", label: "Zone (Cône)" },
  { value: "Zone (Explosion 3 m.)", label: "Zone (Explosion 3 m.)" },
  { value: "Zone (Explosion 4,50 m)", label: "Zone (Explosion 4,50 m)" },
  { value: "Zone (Ligne)", label: "Zone (Ligne)" },
];

// Helper to match trait color logic from Card/styles.ts
const traitColor = (trait: string) => {
  const t = trait.trim().toLowerCase();
  if (t === "unique") return "#800080"; // purple
  if (t === "rare") return "#0c1466"; // blue
  if (t === "uncommon" || t === "peu commun" || t === "peu courant")
    return "#c45500"; // orange
  return "#5d0000"; // default burgundy
};

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
      {/* Traits */}
      <div style={{ marginTop: "10px" }}>
        <label
          style={{ color: "#5d0000", fontWeight: "bold", fontSize: "90%" }}
        >
          Traits:
        </label>
        <CreatableSelect
          styles={{
            control: (base, state) => ({
              ...base,
              border: "1px solid #5d0000",
              borderRadius: 0,
              minHeight: 36,
              boxShadow: "none",
              fontSize: "1em",
              padding: 0,
              color: "black",
              "&:hover": { borderColor: "#5d0000" },
              ...(state.isFocused ? { borderColor: "#5d0000" } : {}),
            }),
            placeholder: (base) => ({
              ...base,
              color: "black",
              opacity: 1,
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: "black",
              padding: 0,
            }),
            clearIndicator: (base) => ({
              ...base,
              padding: 0,
              color: "black",
            }),
            indicatorsContainer: (base) => ({
              ...base,
              padding: "0 !important",
            }),
            indicatorSeparator: (base) => ({
              ...base,
              backgroundColor: "#5d0000",
              display: "none",
            }),
            menu: (base) => ({
              ...base,
              borderRadius: 0,
              fontSize: "1em",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#5d0000" : "white",
              color: state.isFocused ? "white" : "black",
              cursor: "pointer",
            }),
            multiValue: (base, { data }) => ({
              ...base,
              backgroundColor: traitColor(data.value),
              borderRadius: 0,
              border: "2px solid #d8c384",
              fontFamily: "'goodCondensedMedium', 'Arial', sans-serif",
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: "1",
              letterSpacing: "0.05em",
              fontSize: "100%",
              textShadow: "0 0 0 #fff",
            }),
            multiValueLabel: (base, { data }) => ({
              ...base,
              color: "white",
              fontWeight: "bold",
            }),
            multiValueRemove: (base, { data }) => ({
              ...base,
              color: "white",
              backgroundColor: traitColor(data.value),
              ":hover": {
                backgroundColor: "#7a1a1a",
                color: "white",
              },
            }),
            input: (base) => ({
              ...base,
              color: "black",
            }),
          }}
          isMulti
          closeMenuOnSelect={false}
          options={TRAIT_OPTIONS}
          value={(cardData?.traits || "")
            .split(",")
            .filter(Boolean)
            .map((t: string) => ({ value: t.trim(), label: t.trim() }))}
          onChange={(
            selected: MultiValue<{ value: string; label: string }>,
            _action: ActionMeta<{ value: string; label: string }>
          ) =>
            handleTraitsChange(
              selected.map((opt: { value: string }) => opt.value).join(",")
            )
          }
          placeholder="-"
          formatCreateLabel={(input) => `Ajouter "${input}"`}
        />
      </div>
      {/* Actions */}
      <div style={{ marginTop: "10px" }}>
        <label style={{ color: "#5d0000", fontWeight: "bold" }}>Actions:</label>
        <S.StyledSelect
          value={cardData?.actions ?? ""}
          onChange={(e) => handleActionsChange(e.target.value)}
        >
          <option value="">-</option>
          <option value="1">1 action</option>
          <option value="2">2 actions</option>
          <option value="3">3 actions</option>
          <option value="R">Réaction</option>
          <option value="0">Action Gratuite</option>
          <option value="V">Variable</option>
        </S.StyledSelect>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label style={{ color: "#5d0000", fontWeight: "bold" }}>Type:</label>
        <S.StyledSelect
          value={cardData?.type ?? ""}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="">-</option>
          <option value="Cantrip">Cantrip</option>
          <option value="Créature">Créature</option>
          <option value="Don">Don</option>
          <option value="Focalisé">Focalisé</option>
          <option value="Objet">Objet</option>
          <option value="Sort">Sort</option>
        </S.StyledSelect>
      </div>
      {/* Level */}
      <Input
        label="Niveau:"
        value={cardData?.level.toString() ?? ""}
        onChange={handleLevelChange}
      />
      {/* Body */}
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
