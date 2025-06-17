import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './DonutChart.css';

const DonutChart = ({ value, label }) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const animatedValue = useMotionValue(0);

  // 스프링 애니메이션
  const spring = useSpring(animatedValue, {
    stiffness: 100,
    damping: 15,
    mass: 0.5,
  });

  // offset 계산
  const dashOffset = useTransform(spring, latest => circumference * (1 - latest));
  const percentText = useTransform(spring, latest => `${Math.round(latest * 100)}%`);

  // value가 바뀔 때마다 애니메이션 트리거
  useEffect(() => {
    animatedValue.set(value);
  }, [value]);

  return (
    <div className="donut-chart">
      <svg width="220" height="220">
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#eee"
          strokeWidth="20"
          fill="none"
        />
        <motion.circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#0BBBC5"
          strokeWidth="20"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 110 110)"
        />
      </svg>
      <div className="donut-center">
        <motion.div className="percent">{percentText}</motion.div>
        <div className="label">{label}</div>
      </div>
    </div>
  );
};

export default DonutChart;