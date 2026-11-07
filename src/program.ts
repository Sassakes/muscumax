export type Exercise = {id:string;name:string;muscle:string;sets:number;min:number;max:number;rir:number;rest:number;tip:string;alternative:string;increment:number};
export type Plan = {id:string;name:string;subtitle:string;time:string;focus:string;optional?:boolean;exercises:Exercise[]};
const ex=(id:string,name:string,muscle:string,sets:number,min:number,max:number,rir:number,rest:number,tip:string,alternative:string,increment=2.5):Exercise=>({id,name,muscle,sets,min,max,rir,rest,tip,alternative,increment});
export const plans:Plan[]=[
{id:'A',name:'Haut du corps',subtitle:'Bench, dos & finition bras',time:'55–65',focus:'La priorité au bench. Du dos pour équilibrer, puis les bras pour finir.',exercises:[
ex('bench','Développé couché','Pectoraux',3,4,6,2,180,'Appuis stables, barre contrôlée, aucune répétition forcée. Fais 3–4 séries de chauffe progressives. Note la charge totale, barre comprise.','Chest press convergente'),
ex('pulldown','Tirage vertical','Dos',3,6,10,2,120,'Tire les coudes vers les hanches, sans élan. Amplitude confortable pour les épaules.','Tractions assistées'),
ex('incline','Développé incliné haltères','Pectoraux',2,8,12,2,120,'Banc légèrement incliné (15–30°). Note le poids d’un seul haltère, toujours de la même façon.','Presse inclinée machine',1),
ex('row','Rowing poulie','Dos',2,8,12,2,120,'Buste stable, retour contrôlé. Évite de tirer avec les lombaires.','Rowing poitrine appuyée'),
ex('lateral','Élévations latérales','Épaules',2,12,20,2,75,'Léger, sans élan. Monte à une hauteur confortable. Note le poids par haltère.','Machine élévations latérales',1),
ex('curl','Curl biceps poulie','Biceps',2,8,12,2,75,'Coudes stables, descente contrôlée. Tu peux alterner avec les triceps pour gagner du temps.','Curl haltères',1),
ex('triceps','Extension triceps poulie','Triceps',2,10,15,2,75,'Épaules relâchées, coudes fixes. Pas d’extension forcée si le coude tire.','Extension triceps corde',1)]},
{id:'B',name:'Jambes & bras',subtitle:'Une base solide, un rappel bras',time:'45–55',focus:'Un squat propre, une charnière de hanche et un rappel biceps / triceps.',exercises:[
ex('squat','Squat','Quadriceps · fessiers',3,4,6,3,180,'Fais 3–4 séries de chauffe progressives. Amplitude maîtrisée, sans chercher un maximum. Note la charge totale, barre comprise.','Presse à cuisses'),
ex('rdl','Soulevé de terre roumain','Ischios · fessiers',2,6,8,3,150,'Hanches vers l’arrière, barre près des jambes. Descends seulement tant que tu gardes le dos stable.','Hip thrust'),
ex('legcurl','Leg curl','Ischio-jambiers',2,10,15,2,90,'Bassin stable, mouvement contrôlé. Garde de la marge pour tes séances de MMA.','Leg curl allongé'),
ex('legext','Leg extension','Quadriceps',2,10,15,2,90,'Mouvement fluide, amplitude confortable. Pas de verrouillage violent des genoux.','Presse à cuisses légère'),
ex('hammer','Curl marteau','Biceps · brachial',2,10,15,2,75,'Prise neutre et poignets stables. Note le poids d’un haltère.','Curl corde poulie',1),
ex('triceps','Extension triceps poulie','Triceps',2,10,15,2,75,'Même mouvement et même repère de charge que sur la séance A.','Extension triceps corde',1)]},
{id:'C',name:'Full body & bras',subtitle:'Samedi · pecs, épaules & curls',time:'55–70',optional:true,focus:'Rappel pecs et épaules, un peu de jambes, puis les curls barre droite et barre W pour finir. Garde 3–4 reps de marge.',exercises:[
ex('lightbench','Développé haltères','Pectoraux',2,8,12,4,120,'Prise confortable, exécution propre. Note le poids par haltère. Garde 3–4 reps de marge.','Chest press légère',1),
ex('pecfly','Écartés à la poulie','Pectoraux',2,12,15,4,75,'Charge modérée, coudes légèrement fléchis. Rapproche les bras sans étirement forcé et garde les épaules stables.','Pec deck',1),
ex('row','Rowing poulie','Dos',2,10,15,4,90,'Léger et propre. La séance doit te laisser de l’énergie.','Rowing poitrine appuyée'),
ex('shoulderpress','Développé épaules haltères','Épaules',2,8,12,4,120,'Assis, dos stable, prise confortable. Note le poids par haltère. Ne force pas une amplitude qui tire dans les épaules.','Shoulder press machine',1),
ex('press','Presse à cuisses','Quadriceps · fessiers',2,10,15,4,120,'Pieds bien posés, bassin stable. Reste loin de l’échec. Note la charge ajoutée sur la machine.','Goblet squat'),
ex('legcurl','Leg curl','Ischio-jambiers',2,12,15,4,90,'Pas de séries forcées. Si les jambes sont lourdes du MMA, saute cette séance.','Leg curl allongé'),
ex('lateral','Élévations latérales','Épaules',2,12,20,4,75,'Petite charge, sans élan. Garde 3–4 reps en réserve.','Machine élévations latérales',1),
ex('straightcurl','Curl barre droite','Biceps',2,8,12,4,75,'Coudes stables, sans balancer le buste. Note la charge totale, barre comprise. Prise confortable pour les poignets.','Curl poulie barre droite',1),
ex('ezcurl','Curl barre W / EZ','Biceps · brachial',2,10,15,4,75,'Termine léger, descente contrôlée et poignets stables. Note la charge totale, barre comprise. Garde de la marge pour le MMA.','Curl pupitre barre EZ',1)]}];
