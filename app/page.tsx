'use client';

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    course: '',
    moneyPaid: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full bg-white overflow-hidden z-0">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Form Card */}
      <Card className="w-full max-w-md shadow-lg z-10 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-700">Swgatika Event Registration</CardTitle>
          <CardDescription className="text-center text-purple-700">Please fill out the form to show your interest</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter your full name" required 
                       onChange={handleInputChange} value={formData.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" required 
                       onChange={handleInputChange} value={formData.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" name="mobile" placeholder="Enter your mobile number" required 
                       onChange={handleInputChange} value={formData.mobile} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course">Course</Label>
                <Select onValueChange={(value) => handleSelectChange('course', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btech_cse">BTech CSE</SelectItem>
                    <SelectItem value="bca">BCA</SelectItem>
                    <SelectItem value="bsc">BSc</SelectItem>
                    <SelectItem value="msc">MSc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="moneyPaid">Money Paid</Label>
                <Select onValueChange={(value) => handleSelectChange('moneyPaid', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select amount paid" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500">₹500</SelectItem>
                    <SelectItem value="1000">₹1000</SelectItem>
                    <SelectItem value="1500">₹1500</SelectItem>
                    <SelectItem value="2000">₹2000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-700 hover:bg-purple-700" type="submit">Submit Registration</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

