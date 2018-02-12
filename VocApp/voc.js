let vocabulary = []

const transform = (text,categories,user) => {
	return text.split("\n").map(e => e.split(",")).map(e => {return {english:e[0], korean:e[1],category:categories,addedBy:user}})
}


const foundationRequiredVoc = `book,책
notebook,공책
cellphone,핸드폰
computer,컴퓨터
clock,시계
window,창문
black/white board,칠판
desk,책상
chair,의자
pencil case,필통
pen,펜
eraser,지우개
wallet,지갑
money,돈
passport,여권
bag,가방
school,학교
classroom,교실
house,집
book store,서점
toilets,화장실
restaurant,
convenience store,편의점
department store,백화점
bank,은행
park,공원
hospital,병원
Drugstore,약국
airport,공항
hairdresser,미용실
subway station,지하철역`

const foundationVerbs = `to go,가다
to come,오다
everyday go to work/school,다니다
to eat,먹다,
to drink,마시다,
to sleep,자다
to teach,가르치다
to learn,배우다
to see/watch/look,보다
to read,읽다
to write,쓰다
to buy,사다
to sell,팔다
to exercise,운동하다
to wait,기다리다
to cook,요리하다
to work,일하다
to study,공부하다
to get on/ride,타다
to speak,말하다
to cry,울다
to laugh,웃다
to like,좋아하다
to love,사랑하다
to hate,싫어하다
to greet,인사하다
to take a shower,샤워하다`

vocabulary = vocabulary.concat(transform(foundationRequiredVoc,["Foundation","Required"],"Olivier"),
	transform(foundationVerbs,["Foundation","Verbs"],"Olivier")
	)