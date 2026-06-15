import { useState, useEffect } from "react";
import {
  ChevronDown,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Scale,
  Calendar,
  Flame,
  Square,
  CheckSquare,
} from "lucide-react";

const PHASES = [
  {
    id: "phase-1",
    num: "01",
    period: "Juin – Juillet 2026",
    title: "Sécuriser le terrain",
    items: [
      {
        id: "p1-a",
        piste: "Business",
        title: "Contrat-type + démo email finalisée",
        objectif:
          "Formaliser un contrat de prestation simple (livrables, prix, paiement en 2 fois, propriété du code livré vs tes méthodes/templates réutilisables) et boucler ta démo Gmail → Make → GPT-4o → Gmail pour la présenter à des prospects en Italie.",
        outilsNow:
          "Un modèle de contrat de prestation simplifié (1-2 pages, dans Notion ou Word), un document de \"recette client\", et ta démo Make existante.",
        outilsFuture:
          "Les bases contractuelles évoluent peu. Ce qui changera : des générateurs de contrats assistés par IA pourront t'aider à rédiger des clauses, mais la logique (livrables, propriété, paiement) reste la même dans 10 ans.",
        pourquoi:
          "Tu es déjà en contact client, sans filet contractuel. C'est le risque le plus immédiat à couvrir — avant toute montée en compétence technique.",
      },
      {
        id: "p1-b",
        piste: "Technique",
        title: "Bases Python (accélérées)",
        objectif:
          "Syntaxe, fonctions, manipulation de JSON, requêtes HTTP avec la librairie requests. Vise 2-3 semaines max grâce à ton bagage Java/SQL/API — pas 2 mois.",
        outilsNow: "Python 3.12+, VS Code, docs.python.org, librairie requests.",
        outilsFuture:
          "Python reste le langage dominant de l'IA et des agents, et rien n'indique que ça change dans les 5-10 ans qui viennent. C'est l'investissement le moins risqué de tout ce plan : la base sur laquelle tous les frameworks d'orchestration sont construits.",
        pourquoi:
          "Socle minimal pour sortir du no-code quand c'est nécessaire, et pour comprendre ce que font réellement tes automatisations Make/n8n sous le capot.",
      },
    ],
  },
  {
    id: "phase-2",
    num: "02",
    period: "Août 2026",
    title: "Faire parler le code et le client",
    items: [
      {
        id: "p2-a",
        piste: "Business",
        title: "Prospection structurée en Italie",
        objectif:
          "Construire un script de découverte client (Que faites-vous ? Qu'est-ce qui prend du temps ? Combien d'heures ? Combien de personnes ?) et l'utiliser en rendez-vous réels.",
        outilsNow: "Grille de questions découverte, LinkedIn, carnet de notes dans Notion.",
        outilsFuture:
          "La découverte client reste un exercice humain. L'IA peut t'aider à préparer les questions ou résumer les échanges après coup, mais la compétence elle-même ne se périme pas.",
        pourquoi:
          "Sans découverte chiffrée, impossible de construire une offre crédible avec un ROI démontrable — c'est le pont entre \"j'ai un outil\" et \"voici votre retour sur investissement\".",
      },
      {
        id: "p2-b",
        piste: "Technique",
        title: "Function calling en Python",
        objectif:
          "Reproduire ton démo email (résumé → réponse proposée) en code pur, en utilisant le tool use / function calling d'une API LLM.",
        outilsNow:
          "API Claude ou OpenAI (tool use / function calling), Python + librairie requests ou SDK officiel.",
        outilsFuture:
          "Le function calling est la brique universelle de TOUS les frameworks d'agents — CrewAI, LangGraph, MCP en dépendent tous. Comprendre ce mécanisme maintenant accélère tout ce qui suit, quel que soit le framework qui dominera dans 5 ans.",
        pourquoi:
          "Vu d'abord en no-code, puis reproduit en code : cet aller-retour ancre solidement le concept d'agent qui \"décide\" d'appeler un outil.",
      },
    ],
  },
  {
    id: "phase-3",
    num: "03",
    period: "Septembre 2026",
    title: "Élargir le terrain",
    items: [
      {
        id: "p3-a",
        piste: "Business",
        title: "Interviews de découverte au Gabon",
        objectif:
          "Mener les entretiens avec tes contacts dans les cabinets comptables : processus actuels, volumes traités, outils utilisés, points de friction.",
        outilsNow: "Grille de découverte adaptée au contexte gabonais, enregistrement audio + notes structurées.",
        outilsFuture: "—",
        pourquoi:
          "C'est la pièce manquante de ta stratégie Gabon. Sans données réelles issues du terrain, impossible de prioriser une offre pour ce marché.",
      },
      {
        id: "p3-b",
        piste: "Technique",
        title: "RAG & embeddings (niveau concept)",
        objectif:
          "Comprendre le principe du retrieval-augmented generation et des bases vectorielles — au niveau conceptuel, pas besoin de tout coder tout de suite.",
        outilsNow:
          "Documentation introductive LangChain ou OpenAI sur le RAG, une base vectorielle simple (Chroma ou pgvector) pour un test rapide.",
        outilsFuture:
          "Le RAG reste pertinent mais évolue vers de l'\"agentic RAG\" avec des modèles à contexte de plus en plus long. Retiens le concept (\"donner à un agent l'accès à des documents externes\"), pas une implémentation figée. Et garde en tête une nuance importante observée en 2026 : environ 80% des cas réels n'ont besoin que d'un seul agent bien outillé — la tentation du multi-agent \"parce que ça semble plus puissant\" est un piège fréquent.",
        pourquoi:
          "C'est la brique technique derrière l'Offre 5 (assistant interne basé sur les documents d'une entreprise). Même piloté en no-code, comprendre le concept améliore ta vente et ta capacité à dépanner.",
      },
    ],
  },
  {
    id: "phase-4",
    num: "04",
    period: "Octobre 2026",
    title: "Se mettre en conformité",
    items: [
      {
        id: "p4-a",
        piste: "Business",
        title: "RGPD Italie + loi gabonaise, contrat finalisé",
        objectif:
          "Intégrer les obligations de protection des données (RGPD côté Italie/UE, loi gabonaise côté Gabon) dans ton contrat-type et ton discours commercial.",
        outilsNow:
          "Checklist RGPD pour PME (bases légales, durée de conservation, droits des personnes), et les ressources de l'APDPVP pour le Gabon. Voir la section dédiée plus bas.",
        outilsFuture: "—",
        pourquoi:
          "Avec deux marchés actifs, tu as deux cadres réglementaires différents. Le faire maintenant, avant ton premier vrai contrat signé, évite de tout revoir après coup — et devient un argument de vente.",
      },
      {
        id: "p4-b",
        piste: "Technique",
        title: "Premier framework d'orchestration : CrewAI",
        objectif:
          "Construire un petit projet à 2 agents (par exemple un agent \"chercheur\" et un agent \"rédacteur\") pour comprendre la délégation entre agents.",
        outilsNow: "CrewAI (Python) — abstraction simple, premier prototype fonctionnel en moins d'une heure.",
        outilsFuture:
          "CrewAI excelle pour le prototypage rapide, aligné avec ta philosophie \"Demo First\". Mais en 2026, LangGraph est devenu le runtime par défaut de l'écosystème LangChain et s'impose en production grâce à son contrôle d'état et ses pistes d'audit — un vrai atout pour rassurer des clients soucieux de conformité (RGPD inclus). Plan : CrewAI maintenant pour la vitesse de démonstration, LangGraph en Q1 2027 pour la robustesse. Les deux sont complémentaires : CrewAI peut réutiliser les outils de l'écosystème LangChain.",
        pourquoi: "C'est la première vraie brique \"orchestrateur\" — un agent qui délègue et combine des résultats.",
      },
    ],
  },
  {
    id: "phase-5",
    num: "05",
    period: "Novembre – Décembre 2026",
    title: "Convertir et connecter",
    items: [
      {
        id: "p5-a",
        piste: "Business",
        title: "Premier client en Italie + synthèse Gabon",
        objectif:
          "Signer un premier contrat payant en Italie avec ton kit complet (démo + ROI + contrat), et synthétiser les interviews du Gabon pour affiner la stratégie cabinets comptables.",
        outilsNow: "Ton kit de signature complet (démo, grille ROI, contrat finalisé).",
        outilsFuture: "—",
        pourquoi: "C'est l'aboutissement de tout le travail business — sans cette étape, tout le reste reste théorique.",
      },
      {
        id: "p5-b",
        piste: "Technique",
        title: "Model Context Protocol (MCP)",
        objectif:
          "Connecter un agent à un outil externe réel (Gmail, Google Calendar) via un serveur MCP existant.",
        outilsNow: "Serveurs MCP disponibles (Gmail, Calendar, système de fichiers), documentation modelcontextprotocol.io.",
        outilsFuture:
          "MCP est passé sous gouvernance de la Linux Foundation en 2025 et devient le standard ouvert de connexion entre agents et outils — \"le REST API des agents\". C'est probablement l'investissement le plus durable de tout ce plan sur 5-10 ans : indépendant du framework et du fournisseur de modèle que tu choisiras.",
        pourquoi:
          "Avec ton expérience API/Java, tu as déjà l'intuition des protocoles. Formaliser MCP maintenant te différencie nettement des prestataires \"no-code seul\".",
      },
    ],
  },
  {
    id: "phase-6",
    num: "06",
    period: "Q1 2027",
    title: "Consolider l'avantage",
    items: [
      {
        id: "p6-a",
        piste: "Synthèse",
        title: "Agents multi-outils orchestrés",
        objectif:
          "Combiner Python + LangGraph (ou CrewAI selon le cas) + MCP pour traiter des cas hors de portée de Make/n8n — fondement de l'Offre 5 premium et de futures offres sur mesure.",
        outilsNow: "LangGraph ou CrewAI selon le besoin, serveurs MCP, l'API LLM de ton choix.",
        outilsFuture:
          "C'est la combinaison qui devrait rester pertinente le plus longtemps : un langage (Python), un protocole ouvert de connexion (MCP), un framework de contrôle d'état (LangGraph ou son successeur). Le \"no-code\" évoluera probablement vers des interfaces visuelles construites par-dessus ces mêmes briques — donc rien de ce que tu apprends ici n'est du temps perdu, même si les outils de surface changent.",
        pourquoi:
          "Ton double bagage — programmeur ET connaisseur du terrain PME/comptabilité — devient ici un vrai avantage concurrentiel, pas juste \"encore un consultant no-code\".",
      },
    ],
  },
];

const RGPD_ITALIE = [
  "Cadre : RGPD (règlement UE 2016/679). Autorité : Garante per la protezione dei dati personali.",
  "Chaque traitement de données doit reposer sur une base légale (consentement, contrat, intérêt légitime...).",
  "Durée de conservation limitée et justifiée par la finalité du traitement.",
  "Droits garantis : accès, rectification, effacement, portabilité, opposition.",
  "Notification obligatoire d'une violation de données à l'autorité dans les 72 heures.",
  "DPO obligatoire au-delà de certains seuils (traitement à grande échelle ou données sensibles) — rarement le cas pour une petite PME, mais bon à savoir.",
  "Transferts de données hors UE encadrés : clauses contractuelles types avec les fournisseurs (ex. OpenAI, Anthropic, basés aux US).",
];

const RGPD_GABON = [
  "Cadre : loi n°001/2011, réformée par la loi n°025/2023. Autorité : APDPVP (ex-CNPDCP), aux pouvoirs renforcés.",
  "Déclaration obligatoire de chaque traitement de données personnelles auprès de l'APDPVP, avec délivrance d'un récépissé.",
  "Autorisation préalable requise dans certains cas : données sensibles, finalités spécifiques (ex. recherche médicale), ou transferts hors Gabon.",
  "Transferts internationaux strictement encadrés (articles 94-95) : le pays destinataire doit offrir un \"niveau de protection suffisant\" — à ce jour, aucune reconnaissance d'adéquation officielle avec l'UE ou les US.",
  "Sanctions lourdes : de 1 à 100 millions de FCFA, jusqu'à 300 millions en cas de récidive, en plus de sanctions administratives (mise en demeure, interdiction d'activité jusqu'à 3 mois) et pénales.",
];

// Calendrier détaillé de la Phase 1 — 6 semaines, à partir de demain
const CALENDAR_PHASE1 = [
  // Semaine 1
  { id: "cal-1", week: 1, type: "day", date: "Mar 16/06", tech: "Variables et types de base (int, str, float, bool) — petits scripts dans VS Code.", biz: "Réécrire tes 5 offres en 1 phrase bénéfice client chacune, sans jargon technique.", arg: "\"Python c'est pour débutants\" → Ta syntaxe Java t'aide déjà ; ici l'objectif est la vitesse, pas la théorie." },
  { id: "cal-2", week: 1, type: "day", date: "Mer 17/06", tech: "Opérateurs (+, -, %, ==, and/or) et expressions simples.", biz: "Brouillon du contrat — section Livrables : ce qui est inclus, ce qui ne l'est pas.", arg: "\"Un contrat fait fuir les petits clients\" → C'est l'absence de contrat qui crée les conflits, pas l'inverse." },
  { id: "cal-3", week: 1, type: "day", date: "Jeu 18/06", tech: "Conditions if / elif / else — un script qui classe une valeur.", biz: "Contrat — section Prix et paiement échelonné (ex. 50/50 ou 40/40/20).", arg: "\"Demander un acompte va sembler agressif\" → C'est une pratique standard, présente-la comme telle dès le départ." },
  { id: "cal-4", week: 1, type: "day", date: "Ven 19/06", tech: "Boucles for — parcourir une liste de tâches.", biz: "Contrat — section Propriété : code livré vs tes méthodes/templates réutilisables.", arg: "\"Le client va vouloir tout posséder\" → Clarifie-le par écrit avant signature, ça évite toute ambiguïté plus tard." },
  { id: "cal-5", week: 1, type: "exercise", date: "Lun 22/06", difficulty: 1, title: "Exercice 1 — Catalogue d'offres", desc: "Écris un script Python qui définit une liste de 5 offres (nom + phrase bénéfice) et les affiche une par une. Bonus : trie-les par ordre alphabétique." },
  // Semaine 2
  { id: "cal-6", week: 2, type: "day", date: "Mar 23/06", tech: "Boucles while — un script qui répète une action jusqu'à une condition.", biz: "Créer le modèle de document \"recette client\" (validation finale du projet).", arg: "\"Je n'ai pas besoin de document formel\" → Sans recette signée, un désaccord sur \"le projet est fini\" devient ta responsabilité, pas celle du client." },
  { id: "cal-7", week: 2, type: "day", date: "Mer 24/06", tech: "Listes : création, indexation, slicing.", biz: "Grille de découverte client — formule tes 5 questions clés (processus, temps, coût, volume, outils).", arg: "\"Je connais déjà leurs problèmes\" → Poser la question donne au client le sentiment d'être écouté, et révèle souvent un problème différent." },
  { id: "cal-8", week: 2, type: "day", date: "Jeu 25/06", tech: "Méthodes de listes (append, sort, len, in).", biz: "Template de calcul ROI (Notion ou Excel) avec la formule heures × coût horaire.", arg: "\"Le ROI c'est trop commercial pour moi\" → C'est le langage que comprend un dirigeant de PME, plus que \"agent IA\"." },
  { id: "cal-9", week: 2, type: "day", date: "Ven 26/06", tech: "Dictionnaires : clés/valeurs, accès, mise à jour.", biz: "Identifier 10 prospects italiens potentiels sur LinkedIn (PME IT).", arg: "\"Je ne sais pas par où commencer la prospection\" → Commence par ton réseau de la formation en Italie, c'est le chemin le plus court." },
  { id: "cal-10", week: 2, type: "exercise", date: "Lun 29/06", difficulty: 2, title: "Exercice 2 — Catalogue enrichi", desc: "Représente chaque offre comme un dictionnaire (nom, prix, bénéfice) et écris un script qui affiche un petit catalogue formaté à partir d'une liste de ces dictionnaires." },
  // Semaine 3
  { id: "cal-11", week: 3, type: "day", date: "Mar 30/06", tech: "Fonctions : définition et paramètres.", biz: "Affine ta proposition de valeur en 1 phrase claire (ex. \"j'automatise le traitement des demandes clients pour les PME italiennes\").", arg: "\"Une phrase ne peut pas tout dire\" → Une phrase doit ouvrir la conversation, pas la conclure." },
  { id: "cal-12", week: 3, type: "day", date: "Mer 01/07", tech: "Fonctions : valeurs de retour et paramètres par défaut.", biz: "Prépare un pitch de 2 minutes pour présenter ta démo email.", arg: "\"Je ne suis pas à l'aise pour pitcher\" → Un pitch écrit puis répété 5 fois change tout — entraîne-toi devant un miroir ou un proche." },
  { id: "cal-13", week: 3, type: "day", date: "Jeu 02/07", tech: "Modules et imports — organiser un script en plusieurs fichiers.", biz: "Teste ta démo email sur un cas réel (ton propre email ou celui d'un ami).", arg: "\"Ma démo n'est pas parfaite\" → Une démo imparfaite mais réelle vaut mieux qu'une démo parfaite jamais montrée." },
  { id: "cal-14", week: 3, type: "day", date: "Ven 03/07", tech: "Lecture/écriture de fichiers texte (open, read, write).", biz: "Liste les objections fréquentes des prospects + une réponse courte pour chacune.", arg: "\"Et si je ne sais pas répondre à une objection ?\" → \"Bonne question, je creuse et je reviens vers vous\" est une réponse parfaitement valable." },
  { id: "cal-15", week: 3, type: "exercise", date: "Lun 06/07", difficulty: 2, title: "Exercice 3 — Lecture de fichier", desc: "Écris un script qui lit un fichier texte contenant une liste d'emails (un par ligne) et affiche combien il y en a, ainsi que le plus long." },
  // Semaine 4
  { id: "cal-16", week: 4, type: "day", date: "Mar 07/07", tech: "Manipulation JSON : json.load / json.dump.", biz: "Premier message LinkedIn de prise de contact (brouillon, à adapter par prospect).", arg: "\"Le démarchage à froid ne marche jamais\" → Un message court, personnalisé, basé sur un problème précis a un bon taux de réponse — c'est la qualité qui compte, pas le volume." },
  { id: "cal-17", week: 4, type: "day", date: "Mer 08/07", tech: "Gestion des erreurs : try / except.", biz: "Lis les bases RGPD : consentement, durée de conservation, droits des personnes (voir section RGPD plus bas).", arg: "\"Le RGPD c'est un sujet de juriste\" → Tu n'as besoin que de 4-5 notions pour rassurer un client PME, pas d'un diplôme de droit." },
  { id: "cal-18", week: 4, type: "day", date: "Jeu 09/07", tech: "Installer et utiliser `requests` — premier GET vers une API publique.", biz: "Identifie quels outils tiers (OpenAI, Make, n8n) traitent les données dans ta démo, et où ils sont hébergés.", arg: "\"Je ne sais pas où sont hébergées les données de mes outils\" → 15 minutes sur la politique de confidentialité de chaque outil suffisent pour commencer." },
  { id: "cal-19", week: 4, type: "day", date: "Ven 10/07", tech: "Appeler une API publique réelle (ex. météo) et afficher le résultat formaté.", biz: "Ajoute une clause \"traitement des données\" à ton contrat-type (outils utilisés + hébergement).", arg: "\"Ça va alourdir mon contrat\" → 3-4 lignes suffisent, et ça devient un argument de confiance, pas une contrainte." },
  { id: "cal-20", week: 4, type: "exercise", date: "Lun 13/07", difficulty: 3, title: "Exercice 4 — Appel API + fichier", desc: "Écris un script qui appelle une API météo publique pour une ville donnée et écrit le résultat dans un fichier JSON local." },
  // Semaine 5
  { id: "cal-21", week: 5, type: "day", date: "Mar 14/07", tech: "Appels API en POST + headers + clés d'API (variables d'environnement).", biz: "Contacte 3 prospects identifiés avec un message personnalisé basé sur ton offre.", arg: "\"Et s'ils ne répondent pas ?\" → L'absence de réponse n'est pas un échec, c'est une donnée — passe au suivant et ajuste le message." },
  { id: "cal-22", week: 5, type: "day", date: "Mer 15/07", tech: "Refactor : structurer un script en fonctions réutilisables.", biz: "Prépare le rendez-vous découverte n°1 (objectifs, questions, durée).", arg: "\"Je n'ai jamais fait de rendez-vous découverte\" → Ta grille de questions du 24/06 est ton filet de sécurité — suis-la." },
  { id: "cal-23", week: 5, type: "day", date: "Jeu 16/07", tech: "Introduction à l'API d'un LLM : format des messages, rôles (system/user/assistant).", biz: "Mène le rendez-vous découverte n°1 (réel ou simulé avec un proche).", arg: "\"Je vais sembler peu expérimenté\" → La curiosité sincère sur leur métier est perçue comme une force, pas une faiblesse." },
  { id: "cal-24", week: 5, type: "day", date: "Ven 17/07", tech: "Premier script : envoyer un prompt à l'API d'un LLM et afficher la réponse.", biz: "Debrief du rendez-vous : qu'as-tu appris ? Qu'est-ce qui change dans ton offre ?", arg: "\"Et si rien ne se passe comme prévu ?\" → C'est exactement le but de cette étape : ajuster avant de t'engager davantage." },
  { id: "cal-25", week: 5, type: "exercise", date: "Lun 20/07", difficulty: 3, title: "Exercice 5 — Résumeur d'email", desc: "Écris un script qui envoie un texte d'email (en dur dans le code) à l'API d'un LLM avec l'instruction \"résume cet email en 2 phrases\" et affiche le résultat." },
  // Semaine 6
  { id: "cal-26", week: 6, type: "day", date: "Mar 21/07", tech: "Function calling / tool use — comprendre le concept (lecture + petit schéma).", biz: "Recherche 5 contacts dans des cabinets comptables au Gabon.", arg: "\"Je n'ai pas de contacts directs\" → Ton réseau professionnel existant est ton point de départ — un message simple suffit pour ouvrir la porte." },
  { id: "cal-27", week: 6, type: "day", date: "Mer 22/07", tech: "Premier exemple de function calling : définir un \"outil\" simple (ex. calculer une somme) et le faire appeler par le modèle.", biz: "Prépare la grille d'interview Gabon (adaptée de celle du 24/06, contexte comptable).", arg: "\"Les besoins au Gabon sont différents de l'Italie\" → Exactement pourquoi cette grille existe — pose les mêmes questions, écoute les réponses différentes." },
  { id: "cal-28", week: 6, type: "day", date: "Jeu 23/07", tech: "Mini-projet (étape 1) : lire le contenu d'un email (texte fourni) et en extraire les infos clés en Python.", biz: "Planifie les rendez-vous Gabon dans ton calendrier (dates, durée, mode).", arg: "\"Le décalage horaire / la distance complique tout\" → Un appel vidéo de 30 min reste largement suffisant pour une découverte." },
  { id: "cal-29", week: 6, type: "day", date: "Ven 24/07", tech: "Mini-projet (étape 2) : générer une réponse proposée via l'API LLM à partir de l'email lu.", biz: "Révise ton contrat complet avec tout ce que tu as appris ce mois-ci.", arg: "\"Le contrat n'est jamais 'fini'\" → Vrai — vise \"assez bon pour signer\", pas \"parfait\". Tu l'amélioreras avec l'expérience." },
  { id: "cal-30", week: 6, type: "exercise", date: "Lun 27/07", difficulty: 4, title: "Exercice final — Ta démo email en code", desc: "Assemble tout : un script Python qui lit un email, demande à l'API LLM un résumé + une réponse proposée, et affiche les deux. C'est ta démo email... en code. Compare avec ta version Make." },
];

// Exercices progressifs pour les phases 2 à 6 (Application = niveau 2, Défi = niveau 3-4)
const EXERCISES = {
  "p2-a": {
    app: "Mène 2 rendez-vous découverte réels et note les réponses dans ta grille.",
    defi: "À partir des réponses, calcule le ROI estimé pour chaque prospect et identifie lequel est le plus mûr.",
  },
  "p2-b": {
    app: "Ajoute un deuxième outil (ex. \"créer un brouillon Gmail\") à ton script de function calling de l'exercice final de la Phase 1.",
    defi: "Fais en sorte que le modèle choisisse lui-même entre les 2 outils selon le contenu de l'email (résumer vs répondre directement).",
  },
  "p3-a": {
    app: "Mène 3 interviews et résume chacune en 5 lignes (problème, volume, coût estimé).",
    defi: "Construis un tableau comparatif des 3 cabinets pour identifier le profil de client idéal.",
  },
  "p3-b": {
    app: "Installe Chroma (ou pgvector) localement et indexe 3 documents PDF (factures fictives).",
    defi: "Pose une question en langage naturel sur ces documents et affiche la réponse ainsi que la source utilisée.",
  },
  "p4-a": {
    app: "Rédige la clause \"traitement des données\" complète pour ton contrat, en distinguant le cas Italie et le cas Gabon.",
    defi: "Simule un email à un client expliquant en langage simple comment ses données sont protégées.",
  },
  "p4-b": {
    app: "Installe CrewAI et lance l'exemple officiel à 2 agents.",
    defi: "Adapte l'exemple pour qu'un agent \"analyse une demande client\" et qu'un second \"rédige une réponse\" — réutilise ton mini-projet email de la Phase 1.",
  },
  "p5-a": {
    app: "Envoie ton kit de signature (démo + ROI + contrat) à ton prospect le plus avancé.",
    defi: "Négocie et signe ton premier contrat — même à un tarif réduit pour démarrer.",
  },
  "p5-b": {
    app: "Connecte un agent à un serveur MCP existant (ex. Gmail) et fais-lui lister tes 5 derniers emails.",
    defi: "Fais en sorte que l'agent résume ces 5 emails et propose une action pour chacun via MCP.",
  },
  "p6-a": {
    app: "Combine CrewAI/LangGraph + MCP dans un seul projet : un agent qui lit tes emails (MCP) et un autre qui rédige les réponses (LLM).",
    defi: "Présente ce système à un client comme une \"Offre 5\" premium et chiffre-le.",
  },
};

const STATUS_CONFIG = {
  todo: { label: "À faire", icon: Circle, color: "var(--text-dim)" },
  doing: { label: "En cours", icon: Clock, color: "var(--amber)" },
  done: { label: "Fait", icon: CheckCircle2, color: "var(--teal)" },
};

const STATUS_ORDER = ["todo", "doing", "done"];

const WEEK_LABELS = {
  1: "Semaine 1 (16 – 22 juin)",
  2: "Semaine 2 (23 – 29 juin)",
  3: "Semaine 3 (30 juin – 6 juillet)",
  4: "Semaine 4 (7 – 13 juillet)",
  5: "Semaine 5 (14 – 20 juillet)",
  6: "Semaine 6 (21 – 27 juillet)",
};

export default function OrchestratorTracker() {
  const [progress, setProgress] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [openItems, setOpenItems] = useState(new Set(["p1-a"]));
  const [openWeeks, setOpenWeeks] = useState(new Set([1]));
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("orchestrateur-progress");
      if (raw) setProgress(JSON.parse(raw));
    } catch (e) {
      // pas encore de données enregistrées, ou localStorage indisponible
    }
    setLoaded(true);
  }, []);

  const persist = (next) => {
    try {
      localStorage.setItem("orchestrateur-progress", JSON.stringify(next));
      setSaveError(false);
    } catch (e) {
      setSaveError(true);
    }
  };

  const getItem = (id) => progress[id] || { status: "todo", notes: "" };

  const updateItem = (id, patch) => {
    setProgress((prev) => {
      const next = { ...prev, [id]: { ...getItem(id), ...patch } };
      persist(next);
      return next;
    });
  };

  const cycleStatus = (id) => {
    const current = getItem(id).status;
    const idx = STATUS_ORDER.indexOf(current);
    const nextStatus = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
    updateItem(id, { status: nextStatus });
  };

  const toggleDone = (id) => {
    updateItem(id, { status: getItem(id).status === "done" ? "todo" : "done" });
  };

  const toggleOpen = (id) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleWeek = (w) => {
    setOpenWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(w)) next.delete(w);
      else next.add(w);
      return next;
    });
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const phaseItemIds = PHASES.flatMap((p) => p.items.map((i) => i.id));
  const allTrackedIds = [...phaseItemIds, "rgpd"];
  const doneCount = allTrackedIds.filter((id) => getItem(id).status === "done").length;
  const overallPct = Math.round((doneCount / allTrackedIds.length) * 100);

  const calendarDone = CALENDAR_PHASE1.filter((d) => getItem(d.id).status === "done").length;

  const exerciseIds = Object.keys(EXERCISES).flatMap((id) => [`ex-${id}-app`, `ex-${id}-defi`]);
  const exercisesDone = exerciseIds.filter((id) => getItem(id).status === "done").length;

  const phasePct = (phase) => {
    const ids = phase.items.map((i) => i.id);
    const done = ids.filter((id) => getItem(id).status === "done").length;
    return done / ids.length;
  };

  return (
    <div className="orch-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .orch-root {
          --bg: #14161b;
          --bg-elev: #1a1d24;
          --bg-card: #1f232b;
          --border: #2c313b;
          --text: #ece9e2;
          --text-dim: #8b8f99;
          --amber: #ff9d4d;
          --teal: #5fd9c6;
          --amber-soft: rgba(255, 157, 77, 0.14);
          --teal-soft: rgba(95, 217, 198, 0.14);
          font-family: 'Inter', sans-serif;
          background: radial-gradient(circle at 20% 0%, #1c2027 0%, var(--bg) 55%);
          color: var(--text);
          padding: 28px 20px 60px;
          border-radius: 16px;
          min-height: 100%;
        }
        .orch-header {
          max-width: 880px;
          margin: 0 auto 24px;
        }
        .orch-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 8px;
        }
        .orch-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(24px, 5vw, 34px);
          margin: 0 0 6px;
          line-height: 1.15;
        }
        .orch-subtitle {
          color: var(--text-dim);
          font-size: 14px;
          line-height: 1.6;
          max-width: 620px;
        }
        .orch-progress-wrap {
          margin-top: 22px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .orch-progress-pct {
          font-family: 'JetBrains Mono', monospace;
          font-size: 22px;
          font-weight: 500;
          color: var(--teal);
          min-width: 52px;
        }
        .orch-graph {
          flex: 1;
          display: flex;
          align-items: center;
          overflow-x: auto;
          padding: 6px 2px;
        }
        .orch-node-group {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .orch-node {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: var(--text-dim);
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
          background: var(--bg-card);
        }
        .orch-node:hover {
          border-color: var(--amber);
        }
        .orch-node.partial {
          border-color: var(--amber);
          color: var(--amber);
        }
        .orch-node.full {
          border-color: var(--teal);
          background: var(--teal-soft);
          color: var(--teal);
        }
        .orch-edge {
          width: 28px;
          height: 2px;
          background: var(--border);
          flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .orch-edge.lit {
          background: linear-gradient(90deg, var(--amber), var(--teal));
        }
        .orch-stats-row {
          display: flex;
          gap: 20px;
          margin-top: 12px;
          flex-wrap: wrap;
        }
        .orch-stat {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text-dim);
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        .orch-stat strong {
          color: var(--text);
          font-weight: 500;
        }

        .orch-main {
          max-width: 880px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .orch-phase {
          scroll-margin-top: 20px;
        }
        .orch-phase-head {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .orch-phase-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--amber);
          letter-spacing: 0.05em;
        }
        .orch-phase-period {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text-dim);
        }
        .orch-phase-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .orch-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .orch-item {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }
        .orch-item-head {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          cursor: pointer;
          user-select: none;
        }
        .orch-item-status-btn {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-elev);
          cursor: pointer;
          transition: border-color 0.15s ease;
        }
        .orch-item-status-btn:hover {
          border-color: var(--amber);
        }
        .orch-item-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 5px;
          flex-shrink: 0;
        }
        .orch-item-badge.Business { background: var(--amber-soft); color: var(--amber); }
        .orch-item-badge.Technique { background: var(--teal-soft); color: var(--teal); }
        .orch-item-badge.Synthèse { background: linear-gradient(90deg, var(--amber-soft), var(--teal-soft)); color: var(--text); }
        .orch-item-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          flex: 1;
          line-height: 1.3;
        }
        .orch-chevron {
          color: var(--text-dim);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .orch-chevron.open { transform: rotate(180deg); }

        .orch-item-body {
          padding: 0 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--text);
        }
        .orch-block-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 5px;
        }
        .orch-tools-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 620px) {
          .orch-tools-grid { grid-template-columns: 1fr; }
        }
        .orch-tools-box {
          background: var(--bg-elev);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 12px;
        }
        .orch-tools-box.future {
          border-color: var(--teal);
          border-style: dashed;
        }
        .orch-why {
          border-left: 2px solid var(--amber);
          padding-left: 12px;
          color: var(--text-dim);
          font-style: italic;
        }
        .orch-textarea {
          width: 100%;
          min-height: 64px;
          background: var(--bg-elev);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          padding: 10px 12px;
          resize: vertical;
          box-sizing: border-box;
        }
        .orch-textarea:focus {
          outline: none;
          border-color: var(--amber);
        }
        .orch-textarea::placeholder { color: var(--text-dim); }

        .orch-status-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          flex-wrap: wrap;
        }
        .orch-status-pill {
          width: auto;
          height: auto;
          border-radius: 6px;
          padding: 5px 10px;
          display: flex;
          gap: 6px;
          background: var(--bg-elev);
        }

        .orch-exercises {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .orch-exercise-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: var(--bg-elev);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 12px;
          cursor: pointer;
        }
        .orch-exercise-row.done {
          border-color: var(--teal);
        }
        .orch-exercise-row .lvl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--amber);
          flex-shrink: 0;
          padding-top: 1px;
          min-width: 76px;
        }

        /* Calendrier */
        .orch-calendar-section {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px;
        }
        .orch-calendar-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }
        .orch-calendar-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 17px;
        }
        .orch-calendar-sub {
          color: var(--text-dim);
          font-size: 13px;
          margin: 6px 0 16px;
          line-height: 1.6;
        }
        .orch-week {
          border: 1px solid var(--border);
          border-radius: 10px;
          margin-bottom: 10px;
          overflow: hidden;
        }
        .orch-week-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          cursor: pointer;
          background: var(--bg-elev);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 13px;
        }
        .orch-week-progress {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text-dim);
          font-weight: 400;
        }
        .orch-week-body {
          padding: 10px 14px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .orch-day {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 10px;
          border-radius: 8px;
          background: var(--bg-elev);
          border: 1px solid var(--border);
        }
        .orch-day.done {
          border-color: var(--teal);
        }
        .orch-day-check {
          flex-shrink: 0;
          cursor: pointer;
          margin-top: 1px;
        }
        .orch-day-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--amber);
          min-width: 60px;
          flex-shrink: 0;
          padding-top: 1px;
        }
        .orch-day-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          line-height: 1.55;
        }
        .orch-day-row {
          display: flex;
          gap: 6px;
        }
        .orch-day-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 2px 6px;
          border-radius: 4px;
          flex-shrink: 0;
          height: fit-content;
          margin-top: 2px;
        }
        .orch-day-tag.tech { background: var(--teal-soft); color: var(--teal); }
        .orch-day-tag.biz { background: var(--amber-soft); color: var(--amber); }
        .orch-day-arg {
          color: var(--text-dim);
          font-style: italic;
          font-size: 12px;
          border-left: 2px solid var(--border);
          padding-left: 8px;
          margin-top: 2px;
        }
        .orch-exercise-card {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 12px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--amber-soft), var(--teal-soft));
          border: 1px solid var(--amber);
        }
        .orch-exercise-card.done {
          border-color: var(--teal);
          opacity: 0.75;
        }
        .orch-exercise-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 13.5px;
          margin-bottom: 4px;
        }
        .orch-flames {
          display: inline-flex;
          gap: 1px;
          margin-left: 6px;
        }

        .orch-rgpd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 620px) {
          .orch-rgpd-grid { grid-template-columns: 1fr; }
        }
        .orch-rgpd-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
        }
        .orch-rgpd-flag {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .orch-rgpd-card ul {
          margin: 0;
          padding-left: 18px;
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-dim);
        }
        .orch-rgpd-card li { margin-bottom: 8px; }
        .orch-synthesis {
          background: linear-gradient(135deg, var(--amber-soft), var(--teal-soft));
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          font-size: 13.5px;
          line-height: 1.65;
        }
        .orch-synthesis-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .orch-footer {
          max-width: 880px;
          margin: 32px auto 0;
          font-size: 12px;
          color: var(--text-dim);
          font-family: 'JetBrains Mono', monospace;
          text-align: center;
        }
      `}</style>

      <div className="orch-header">
        <div className="orch-eyebrow">Roadmap · Orchestrateur IA</div>
        <h1 className="orch-title">Mission Control — Demo First → Orchestrateur IA</h1>
        <p className="orch-subtitle">
          Juin 2026 → Q1 2027. Chaque nœud est une phase, chaque carte un objectif avec ses outils
          (maintenant et dans 5-10 ans) et la logique derrière. La Phase 1 a son calendrier
          jour par jour à partir de demain. Clique sur un statut ou une case pour faire avancer
          ta progression — tout est sauvegardé automatiquement.
        </p>
        <div className="orch-progress-wrap">
          <div className="orch-progress-pct">{loaded ? `${overallPct}%` : "…"}</div>
          <div className="orch-graph">
            {PHASES.map((phase, idx) => {
              const pct = phasePct(phase);
              return (
                <div className="orch-node-group" key={phase.id}>
                  <div
                    className={`orch-node ${pct === 1 ? "full" : pct > 0 ? "partial" : ""}`}
                    onClick={() => scrollToId(phase.id)}
                    title={phase.period}
                  >
                    {phase.num}
                  </div>
                  {idx < PHASES.length - 1 && (
                    <div className={`orch-edge ${pct === 1 ? "lit" : ""}`} />
                  )}
                </div>
              );
            })}
            <div className="orch-edge" />
            <div
              className={`orch-node ${getItem("rgpd").status === "done" ? "full" : getItem("rgpd").status === "doing" ? "partial" : ""}`}
              onClick={() => scrollToId("rgpd-section")}
              title="RGPD Italie / Gabon"
            >
              <Scale size={14} />
            </div>
          </div>
        </div>
        <div className="orch-stats-row">
          <div className="orch-stat" onClick={() => scrollToId("calendar-section")}>
            <Calendar size={13} /> Calendrier Phase 1 : <strong>{calendarDone}/{CALENDAR_PHASE1.length}</strong>
          </div>
          <div className="orch-stat">
            <Flame size={13} /> Exercices : <strong>{exercisesDone}/{exerciseIds.length}</strong>
          </div>
        </div>
      </div>

      <div className="orch-main">
        <section className="orch-calendar-section" id="calendar-section">
          <div className="orch-calendar-header">
            <Calendar size={18} color="var(--amber)" />
            <span className="orch-calendar-title">Calendrier — ça commence demain</span>
          </div>
          <p className="orch-calendar-sub">
            6 semaines, du mardi 16 juin au lundi 27 juillet 2026. Chaque jour : une micro-tâche
            technique (🟦), une micro-tâche business (🟧), et l'argument du jour — l'objection ou
            le blocage mental le plus probable, avec de quoi y répondre. Chaque fin de semaine :
            un exercice qui combine ce que tu as appris, à difficulté croissante 🔥.
          </p>
          {[1, 2, 3, 4, 5, 6].map((w) => {
            const days = CALENDAR_PHASE1.filter((d) => d.week === w);
            const doneInWeek = days.filter((d) => getItem(d.id).status === "done").length;
            const isOpen = openWeeks.has(w);
            return (
              <div className="orch-week" key={w}>
                <div className="orch-week-head" onClick={() => toggleWeek(w)}>
                  <span>{WEEK_LABELS[w]}</span>
                  <span className="orch-week-progress">
                    {doneInWeek}/{days.length}
                    <ChevronDown size={14} className={`orch-chevron ${isOpen ? "open" : ""}`} style={{ marginLeft: "8px", verticalAlign: "middle" }} />
                  </span>
                </div>
                {isOpen && (
                  <div className="orch-week-body">
                    {days.map((d) => {
                      const state = getItem(d.id);
                      const isDone = state.status === "done";
                      if (d.type === "exercise") {
                        return (
                          <div className={`orch-exercise-card ${isDone ? "done" : ""}`} key={d.id}>
                            <div className="orch-day-check" onClick={() => toggleDone(d.id)}>
                              {isDone ? <CheckSquare size={18} color="var(--teal)" /> : <Square size={18} color="var(--text-dim)" />}
                            </div>
                            <div>
                              <div className="orch-exercise-title">
                                {d.title}
                                <span className="orch-flames">
                                  {Array.from({ length: d.difficulty }).map((_, i) => (
                                    <Flame key={i} size={13} color="var(--amber)" />
                                  ))}
                                </span>
                                <span style={{ color: "var(--text-dim)", fontWeight: 400, marginLeft: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}>
                                  {d.date}
                                </span>
                              </div>
                              {d.desc}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div className={`orch-day ${isDone ? "done" : ""}`} key={d.id}>
                          <div className="orch-day-check" onClick={() => toggleDone(d.id)}>
                            {isDone ? <CheckSquare size={18} color="var(--teal)" /> : <Square size={18} color="var(--text-dim)" />}
                          </div>
                          <div className="orch-day-date">{d.date}</div>
                          <div className="orch-day-content">
                            <div className="orch-day-row">
                              <span className="orch-day-tag tech">tech</span>
                              <span>{d.tech}</span>
                            </div>
                            <div className="orch-day-row">
                              <span className="orch-day-tag biz">biz</span>
                              <span>{d.biz}</span>
                            </div>
                            <div className="orch-day-arg">{d.arg}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {PHASES.map((phase) => (
          <section className="orch-phase" id={phase.id} key={phase.id}>
            <div className="orch-phase-head">
              <span className="orch-phase-num">{phase.num}</span>
              <h2 className="orch-phase-title">{phase.title}</h2>
              <span className="orch-phase-period">{phase.period}</span>
            </div>
            <div className="orch-items">
              {phase.items.map((item) => {
                const state = getItem(item.id);
                const StatusIcon = STATUS_CONFIG[state.status].icon;
                const isOpen = openItems.has(item.id);
                const ex = EXERCISES[item.id];
                return (
                  <div className="orch-item" key={item.id}>
                    <div className="orch-item-head" onClick={() => toggleOpen(item.id)}>
                      <div
                        className="orch-item-status-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          cycleStatus(item.id);
                        }}
                        title={`Statut : ${STATUS_CONFIG[state.status].label} (clique pour changer)`}
                      >
                        <StatusIcon size={15} color={STATUS_CONFIG[state.status].color} />
                      </div>
                      <span className={`orch-item-badge ${item.piste}`}>{item.piste}</span>
                      <span className="orch-item-title">{item.title}</span>
                      <ChevronDown size={18} className={`orch-chevron ${isOpen ? "open" : ""}`} />
                    </div>
                    {isOpen && (
                      <div className="orch-item-body">
                        <div>
                          <div className="orch-block-label">Objectif</div>
                          {item.objectif}
                        </div>
                        {(item.outilsNow !== "—" || item.outilsFuture !== "—") && (
                          <div className="orch-tools-grid">
                            {item.outilsNow !== "—" && (
                              <div className="orch-tools-box">
                                <div className="orch-block-label">Outils — maintenant (2026)</div>
                                {item.outilsNow}
                              </div>
                            )}
                            {item.outilsFuture !== "—" && (
                              <div className="orch-tools-box future">
                                <div className="orch-block-label">Sur 5-10 ans</div>
                                {item.outilsFuture}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="orch-why">{item.pourquoi}</div>
                        {ex && (
                          <div>
                            <div className="orch-block-label">Parcours d'exercices</div>
                            <div className="orch-exercises">
                              {[
                                { key: "app", label: "Application", flames: 2, text: ex.app },
                                { key: "defi", label: "Défi", flames: 3, text: ex.defi },
                              ].map((lvl) => {
                                const exId = `ex-${item.id}-${lvl.key}`;
                                const exState = getItem(exId);
                                const exDone = exState.status === "done";
                                return (
                                  <div
                                    className={`orch-exercise-row ${exDone ? "done" : ""}`}
                                    key={exId}
                                    onClick={() => toggleDone(exId)}
                                  >
                                    {exDone ? <CheckSquare size={16} color="var(--teal)" /> : <Square size={16} color="var(--text-dim)" />}
                                    <span className="lvl">
                                      {lvl.label}
                                      <span className="orch-flames">
                                        {Array.from({ length: lvl.flames }).map((_, i) => (
                                          <Flame key={i} size={11} color="var(--amber)" />
                                        ))}
                                      </span>
                                    </span>
                                    <span>{lvl.text}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        <div className="orch-status-row">
                          {STATUS_ORDER.map((s) => {
                            const SIcon = STATUS_CONFIG[s].icon;
                            return (
                              <button
                                key={s}
                                className="orch-item-status-btn orch-status-pill"
                                style={{
                                  borderColor: state.status === s ? STATUS_CONFIG[s].color : "var(--border)",
                                  color: state.status === s ? STATUS_CONFIG[s].color : "var(--text-dim)",
                                }}
                                onClick={() => updateItem(item.id, { status: s })}
                              >
                                <SIcon size={13} />
                                {STATUS_CONFIG[s].label}
                              </button>
                            );
                          })}
                        </div>
                        <div>
                          <div className="orch-block-label">Tes sources & notes</div>
                          <textarea
                            className="orch-textarea"
                            placeholder="Liens vers tutoriels, articles, vidéos, retours d'expérience clients..."
                            value={state.notes || ""}
                            onChange={(e) => updateItem(item.id, { notes: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <section className="orch-phase" id="rgpd-section">
          <div className="orch-phase-head">
            <span className="orch-phase-num">RGPD</span>
            <h2 className="orch-phase-title">Italie (RGPD/UE) vs Gabon (loi n°025/2023)</h2>
          </div>
          <div className="orch-rgpd-grid">
            <div className="orch-rgpd-card">
              <div className="orch-rgpd-flag">🇮🇹 Italie / Union Européenne</div>
              <ul>
                {RGPD_ITALIE.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="orch-rgpd-card">
              <div className="orch-rgpd-flag">🇬🇦 Gabon</div>
              <ul>
                {RGPD_GABON.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ height: "14px" }} />
          <div className="orch-synthesis">
            <div className="orch-synthesis-title">
              <Sparkles size={16} /> Ce que ça veut dire concrètement pour toi
            </div>
            Dans les deux pays, dès qu'un outil tiers (API OpenAI/Claude, Make, n8n cloud) traite
            les données d'un client, ces données "voyagent" vers des serveurs situés ailleurs — ce
            qui déclenche les règles de transfert international dans les deux juridictions. Côté
            Italie/UE, c'est bien balisé : la plupart des fournisseurs US proposent des clauses
            contractuelles types, à vérifier et mentionner dans ton contrat. Côté Gabon, le cadre
            est plus récent et moins éprouvé : la transparence totale avec le client ("vos données
            transitent par X, hébergé en Y") est ta meilleure protection, et pour les données
            comptables/fiscales sensibles, privilégier des hébergeurs basés en UE plutôt qu'aux
            US peut être un argument différenciant. Dans tous les cas, ajoute une clause dans ton
            contrat-type précisant quels outils traitent les données et où elles sont hébergées —
            ça devient un argument de vente ("transparence totale sur le traitement de vos
            données").
            <div style={{ marginTop: "14px" }}>
              <div className="orch-status-row">
                {STATUS_ORDER.map((s) => {
                  const SIcon = STATUS_CONFIG[s].icon;
                  const state = getItem("rgpd");
                  return (
                    <button
                      key={s}
                      className="orch-item-status-btn orch-status-pill"
                      style={{
                        borderColor: state.status === s ? STATUS_CONFIG[s].color : "var(--border)",
                        color: state.status === s ? STATUS_CONFIG[s].color : "var(--text-dim)",
                      }}
                      onClick={() => updateItem("rgpd", { status: s })}
                    >
                      <SIcon size={13} />
                      {STATUS_CONFIG[s].label}
                    </button>
                  );
                })}
              </div>
              <textarea
                className="orch-textarea"
                style={{ marginTop: "10px" }}
                placeholder="Notes : clauses à ajouter, hébergeurs envisagés, contacts APDPVP..."
                value={getItem("rgpd").notes || ""}
                onChange={(e) => updateItem("rgpd", { notes: e.target.value })}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="orch-footer">
        {saveError ? "Sauvegarde indisponible pour le moment — réessaie plus tard." : "Progression sauvegardée automatiquement"}
      </div>
    </div>
  );
}