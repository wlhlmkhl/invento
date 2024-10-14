"use client";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "../components/Tabs";
import axios from "axios";
import List from "../components/List";
import CreateItem from "../components/CreateItem";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between w-full p-12">
      <div className="w-full">
        <Tabs>
          <Tab label="Item List">
            <div className="py-4">
              <List />
            </div>
          </Tab>
          <Tab label="Create Item">
            <div className="py-4">
              <CreateItem />
            </div>
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
