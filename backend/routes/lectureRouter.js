const express = require("express");
const router = express.Router();
const fs = require("fs");

const lectureData = JSON.parse(fs.readFileSync("./lectures.json", "utf-8")).data;

router.get("/", (req, res) => {
  // 쿼리 파라미터로 검색어가 들어오면 검색어에 해당하는 강의만 필터링
  // 검색할 수 있는 항목: day, time, prof_nm, credit
  const { day, time, prof_nm, credit } = req.query;

  let filteredLectureData = lectureData;
  if (day) {
    filteredLectureData = filteredLectureData.filter((lecture) => {
      return lecture.time_room.includes(day);
    });
  }

  if (time) {
    filteredLectureData = filteredLectureData.filter((lecture) => {
      let time_room = lecture.time_room;
      console.log(time_room);

      let timeArr = time_room.match(/\d-\d/g);
      if (!timeArr) return false;

      for (let i = 0; i < timeArr.length; i++) {
        const [startTime, endTime] = timeArr[i].split("-");

        if (Number(startTime) <= time && time <= Number(endTime)) {
          return true;
        }
      }
    });
  }

  if (prof_nm) {
    filteredLectureData = filteredLectureData.filter((lecture) => {
      return lecture.prof_nm.includes(prof_nm);
    });
  }

  if (credit) {
    filteredLectureData = filteredLectureData.filter((lecture) => {
      return lecture.credit == credit;
    });
  }

  res.json(filteredLectureData);
});

module.exports = router;
