const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();

// const dictUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
// const wordsArray = [
//   "Abundant",
//   "Benevolent",
//   "Conundrum",
//   "Diligent",
//   "Ephemeral",
//   "Facetious",
//   "Galvanize",
//   "Hapless",
//   "Ineffable",
//   "Juxtapose",
//   "Kinetic",
//   "Luminous",
//   "Malleable",
//   "Nebulous",
//   "Obliterate",
//   "Panacea",
//   "Quixotic",
//   "Resilient",
//   "Serendipity",
//   "Trepidation",
//   "Ubiquitous",
//   "Vacillate",
//   "Wistful",
//   "Xenophobia",
//   "Yearn",
//   "Zenith",
//   "Altruistic",
//   "Belligerent",
//   "Capricious",
//   "Deleterious",
//   "Ephemeral",
//   "Facetious",
//   "Garrulous",
//   "Hapless",
//   "Iconoclast",
//   "Juxtapose",
//   "Kindle",
//   "Loquacious",
//   "Mellifluous",
//   "Nebulous",
//   "Obliterate",
//   "Panacea",
//   "Quixotic",
//   "Resilient",
//   "Serendipity",
//   "Trepidation",
//   "Ubiquitous",
//   "Vacillate",
//   "Wistful",
//   "Xenophobia",
//   "Yearn",
//   "Zenith",
//   "Acquiesce",
//   "Bombastic",
//   "Cacophony",
//   "Delineate",
//   "Enigmatic",
//   "Fallacious",
//   "Gregarious",
//   "Hapless",
//   "Iconoclast",
//   "Juxtapose",
//   "Kindle",
//   "Lucid",
//   "Magnanimous",
//   "Nebulous",
//   "Obstinate",
//   "Panacea",
//   "Quixotic",
//   "Resilient",
//   "Serene",
//   "Tenacious",
//   "Ubiquitous",
//   "Verbose",
//   "Wary",
//   "Xenophobia",
//   "Yearn",
//   "Zestful",
//   "Aplomb",
//   "Bellicose",
//   "Capitulate",
//   "Deft",
// ];

async function main() {
  await mongoose.connect(
    "mongodb+srv://srivatsan:gL2PeXtFCsLXbIfC@cluster0.xd31wsk.mongodb.net/Dictionary?retryWrites=true&w=majority"
  );
}

main().catch((err) => {
  console.log(err);
});

const dictSchema = new mongoose.Schema({
  word: String,
  meaning: String,
});

const Word = mongoose.model("Word", dictSchema);

// wordsArray.forEach(w =>{
//     axios.get(dictUrl+w).then(response =>{
//         const [article] = response.data; 
//         const {word, meanings} = article;
//         const def = meanings[0].definitions[0].definition;
//         const newEntry = new Word({
//             word : word,
//             meaning : def
//         });
//         newEntry.save();


//     }).catch(err=>{
//         console.log(err);
//     })
// });

app.get('/', (req, res)=>{
    res.send("hello");
});

app.get('/meaning/:word', (req, res)=>{
    Word.find({word : req.params.word}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err);
    });
});


app.post('/postword', (req, res)=>{
    const word = req.query.word;
    const meaning = req.query.meaning; 
    const newEntry = new Word({
        word : word,
        meaning : meaning
    }); 
    newEntry.save().then(()=> res.send("successfully saved to database")).catch((err)=>console.log(err));
});

app.put('/updatedoc/:word', (req, res)=>{
  const word = req.params.word;
  const updatedDoc = {
    word : req.query.word,
    meaning : req.query.meaning 
  } 
  Word.findOneAndUpdate({word : word}, updatedDoc, {new : true}).then(
    updatedDoc =>{
      res.send(updatedDoc);
    }
  ).catch(err=>{
    res.send(err);
  });

});

app.patch('/patchupdate/:word', (req, res)=>{
  const word = req.params.word;
  const update = req.query
  console.log(req.query); 
  Word.findOneAndUpdate({word : word}, {$set : update}, {new : true}).then(
    updatedDoc =>{
      res.send(updatedDoc);
    }
  ).catch(err=>{
    res.send(err);
  });

})


app.delete('/delete/:word', (req, res)=>{
  Word.findOneAndDelete({word : req.params.word}).then(result =>{
    res.send("successfully deleted "+req.params.word+" document");
  }).catch(err=>{
    console.log(err);
  });
})



app.listen(3000, (req, res)=>{
    console.log("listening at port 3000");
});